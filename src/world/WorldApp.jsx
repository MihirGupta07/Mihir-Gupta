import { Component, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { MotionConfig } from 'framer-motion';
import World from './scene/World';
import Hud from './ui/Hud';
import Panel from './ui/Panels';
import { Loader, Hero } from './ui/Intro';
import { useWorld, setState, getState, rig } from './store';
import { panelFromHash, travelTo, travelToProject } from './actions';
import './world.css';

const SEEN = 'mg-world-seen';
// read once at load: did this browser already see the intro?
const returning = (() => { try { return localStorage.getItem(SEEN) === '1'; } catch { return false; } })();

function detectQuality() {
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 8;
  return coarse || reduced || cores <= 4 || mem <= 4 ? 'low' : 'high';
}
setState({ quality: detectQuality() });

// If WebGL dies mid-session, drop to the classic site instead of a blank screen.
class Boundary extends Component {
  componentDidCatch(err) { console.error('World failed, falling back to classic site', err); this.props.onError(); }
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

// Arriving from a deep link (#projects/geohide) flies you there once the world is up.
function followHash() {
  const p = panelFromHash();
  if (!p) return;
  if (p.type === 'projects' && p.slug) travelToProject(p.slug);
  else travelTo(p.type);
}

function enter() {
  try { localStorage.setItem(SEEN, '1'); } catch { /* private mode */ }
  rig.intro = 1;
  const deepLink = !!panelFromHash();
  setState({ phase: 'explore', onboarding: !returning && !deepLink });
  followHash();
}

export default function WorldApp({ onClassic }) {
  const quality = useWorld((s) => s.quality);
  const ready = useWorld((s) => s.ready);

  useEffect(() => {
    const onPop = () => {
      const p = panelFromHash();
      if (getState().phase === 'explore') setState({ panel: p });
    };
    window.addEventListener('popstate', onPop);
    // never strand anyone on the loader
    const t = setTimeout(() => getState().phase === 'loading' && setState({ phase: 'intro' }), 9000);
    return () => { window.removeEventListener('popstate', onPop); clearTimeout(t); };
  }, []);

  useEffect(() => {
    if (!ready || getState().phase !== 'loading') return;
    const t = setTimeout(() => {
      // returning visitors and deep links skip the cinematic and go straight to exploring
      if (returning || panelFromHash()) enter();
      else setState({ phase: 'intro' });
    }, 350);
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="world">
        <a className="skip-link" href="?classic" onClick={(e) => { e.preventDefault(); onClassic(); }}>Skip to the text-only site</a>
        <Boundary onError={onClassic}>
          <div className="world__canvas">
            <World quality={quality} />
          </div>
        </Boundary>
        <Hero onEnter={enter} />
        <Hud onClassic={onClassic} />
        <Panel />
        <Loader />
        <Toaster position="bottom-center" toastOptions={{ className: 'world-toast' }} />
      </div>
    </MotionConfig>
  );
}
