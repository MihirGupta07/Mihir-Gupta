import { useEffect, useRef } from 'react';
import { Compass, HelpCircle, LayoutList, Map as MapIcon, Volume2, VolumeX } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/constants';
import { useWorld, setState, getState, rig } from '../store';
import { DESTINATIONS, ISLANDS, BRIDGES, islandById, destById, SECRET } from '../data';
import { travelTo, openPanel, interact, tourGo, TOUR_STOPS } from '../actions';
import { setAudio } from '../audio';
import { CREDITS } from '../assets/manifest';

const TOUR = TOUR_STOPS;
const startTour = () => tourGo(0);

// Bounds of the playable map, in world units
const MAP = { x0: -125, x1: 62, z0: -152, z1: 30 };
const mx = (x) => x - MAP.x0;
const mz = (z) => z - MAP.z0;

function Minimap() {
  const marker = useRef();
  const visited = useWorld((s) => s.visited);
  const open = useWorld((s) => s.map ?? true);
  useEffect(() => {
    let raf;
    const tick = () => {
      if (marker.current) marker.current.setAttribute('transform', `translate(${mx(rig.pos.x)} ${mz(rig.pos.z)}) rotate(${(-rig.yaw * 180) / Math.PI})`);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);
  if (!open) return null;
  return (
    <div className="minimap" aria-hidden="true">
      <svg viewBox={`0 0 ${MAP.x1 - MAP.x0} ${MAP.z1 - MAP.z0}`}>
        {BRIDGES.map(([a, b]) => (
          <line key={a + b} x1={mx(islandById[a].x)} y1={mz(islandById[a].z)} x2={mx(islandById[b].x)} y2={mz(islandById[b].z)} className="minimap__path" />
        ))}
        {ISLANDS.map((i) => {
          const d = DESTINATIONS.find((d) => d.island === i.id);
          if (i.id === SECRET.island) {
            return visited.includes(SECRET.id)
              ? <circle key={i.id} cx={mx(i.x)} cy={mz(i.z)} r={i.r} fill={SECRET.color} opacity="0.8" />
              : <text key={i.id} x={mx(i.x)} y={mz(i.z) + 3} className="minimap__q">?</text>;
          }
          return (
            <g key={i.id} className={d ? 'minimap__dest' : undefined} onClick={d ? () => travelTo(d.id) : undefined}>
              <circle cx={mx(i.x)} cy={mz(i.z)} r={i.r} fill={d ? d.color : '#5A5370'} opacity={d ? (visited.includes(d.id) ? 0.95 : 0.55) : 0.35} />
            </g>
          );
        })}
        <g ref={marker}><path d="M0 -5 L3.6 4 L0 2.2 L-3.6 4 Z" className="minimap__me" /></g>
      </svg>
    </div>
  );
}

function Onboarding() {
  const show = useWorld((s) => s.onboarding && !s.panel);
  if (!show) return null;
  const close = () => setState({ onboarding: false });
  return (
    <div className="onboard" role="dialog" aria-labelledby="onboard-t">
      <h2 id="onboard-t">How to explore</h2>
      <dl>
        <div><dt><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> / arrows</dt><dd>Move. Hold <kbd>Shift</kbd> to go faster</dd></div>
        <div><dt>Drag</dt><dd>Look around</dd></div>
        <div><dt>Scroll / pinch</dt><dd>Move the camera closer or farther</dd></div>
        <div><dt>Click</dt><dd>Travel to any landmark or spot on the ground</dd></div>
        <div><dt><kbd>E</kbd></dt><dd>Enter the place you are standing at</dd></div>
        <div><dt><kbd>Esc</kbd></dt><dd>Close a panel and return to the world</dd></div>
      </dl>
      <p>Prefer to skip the walking? The bar at the top goes straight to every section.</p>
      <div className="onboard__actions">
        <button className="btn-gold" onClick={close} autoFocus>Start exploring</button>
        <button className="btn-text" onClick={startTour}>Take the 60-second tour</button>
      </div>
      <p className="onboard__credits">
        3D models:{' '}
        {CREDITS.map((c, k) => (
          <span key={c.url}>{k > 0 && ' · '}<a href={c.url} target="_blank" rel="noreferrer">{c.what}</a> by {c.who} ({c.license})</span>
        ))}
      </p>
    </div>
  );
}

function TourCard() {
  const step = useWorld((s) => s.tourStep);
  if (step === null) return null;
  const d = destById[TOUR[step]];
  return (
    <div className="tour" style={{ '--c': d.color }} role="status">
      <p className="tour__n">Tour · {step + 1} / {TOUR.length}</p>
      <h2>{d.name}</h2>
      <p>{d.blurb}</p>
      <div className="tour__actions">
        <button className="btn-gold" onClick={() => openPanel(d.id)}>Open {d.section}</button>
        <button className="btn-text" onClick={() => tourGo(step + 1)}>{step + 1 < TOUR.length ? 'Next stop' : 'Finish'}</button>
        <button className="btn-text" onClick={() => setState({ tourStep: null })}>End tour</button>
      </div>
    </div>
  );
}

// Touch-only movement stick (CSS hides it unless the primary pointer is coarse).
const STICK_R = 44;
function Joystick() {
  const knob = useRef();
  const id = useRef(null);
  const set = (x, y) => {
    rig.stick.x = x; rig.stick.y = y;
    if (knob.current) knob.current.style.transform = `translate(${x * STICK_R}px, ${y * STICK_R}px)`;
  };
  const move = (e) => {
    if (e.pointerId !== id.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    let x = (e.clientX - r.left - r.width / 2) / STICK_R, y = (e.clientY - r.top - r.height / 2) / STICK_R;
    const l = Math.hypot(x, y);
    if (l > 1) { x /= l; y /= l; }
    set(x, y);
  };
  const end = (e) => { if (e.pointerId === id.current) { id.current = null; set(0, 0); } };
  useEffect(() => () => set(0, 0), []);
  return (
    <div className="joystick" aria-hidden="true"
      onPointerDown={(e) => {
        id.current = e.pointerId; rig.travel = null; move(e);
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* pointer already gone */ }
      }}
      onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
      <span ref={knob} className="joystick__knob" />
    </div>
  );
}

export default function Hud({ onClassic }) {
  const phase = useWorld((s) => s.phase);
  const nearby = useWorld((s) => s.nearby);
  const panel = useWorld((s) => s.panel);
  const audio = useWorld((s) => s.audio);
  const tourStep = useWorld((s) => s.tourStep);
  const visitedCount = useWorld((s) => s.visited.filter((v) => TOUR.includes(v)).length);

  useEffect(() => {
    const onKey = (e) => {
      if (/INPUT|TEXTAREA/.test(e.target.tagName) || getState().phase !== 'explore') return;
      if (e.key === 'm' || e.key === 'M') setState((s) => ({ map: !(s.map ?? true) }));
      if (e.key === '?' || e.key === 'h') setState((s) => ({ onboarding: !s.onboarding }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (phase !== 'explore') return null;
  const toggleAudio = () => { setAudio(!audio); setState({ audio: !audio }); };
  const go = (e, id) => { e.preventDefault(); setState({ tourStep: null }); travelTo(id); };

  return (
    <>
      <header className="hud-top">
        <button className="hud-brand" onClick={() => travelTo('home')}>
          <span>{PERSONAL_INFO.name}</span>
          <span className="hud-where" aria-live="polite">{nearby?.name ?? 'Open sky'}</span>
        </button>
        <nav className="hud-nav" aria-label="Destinations">
          {DESTINATIONS.map((d) => (
            <a key={d.id} href={d.id === 'home' ? '#' : `#${d.id}`} style={{ '--c': d.color }}
              aria-current={panel?.type === d.id ? 'page' : undefined} onClick={(e) => go(e, d.id)}>
              {d.section}
            </a>
          ))}
        </nav>
        <div className="hud-tools">
          <button onClick={startTour} aria-label="Guided tour" title="Guided tour" aria-pressed={tourStep !== null}><Compass size={17} /></button>
          <button onClick={() => setState((s) => ({ map: !(s.map ?? true) }))} aria-label="Toggle minimap (M)" title="Minimap (M)"><MapIcon size={17} /></button>
          <button onClick={toggleAudio} aria-label={audio ? 'Mute ambient sound' : 'Play ambient sound'} title="Sound" aria-pressed={audio}>
            {audio ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>
          <button onClick={() => setState({ onboarding: true })} aria-label="Controls" title="Controls (H)"><HelpCircle size={17} /></button>
          <button onClick={onClassic} aria-label="Switch to the classic site" title="Classic site"><LayoutList size={17} /></button>
        </div>
      </header>

      <p className="hud-progress" aria-label={`${visitedCount} of 5 places discovered`}>
        {TOUR.map((id) => <span key={id} style={{ '--c': destById[id].color }} data-on={getState().visited.includes(id)} />)}
        <span className="hud-progress__t">{visitedCount === 5 ? 'Every region discovered — the Beacon burns brighter' : `${visitedCount}/5 discovered`}</span>
      </p>

      {nearby && !panel && nearby.id !== 'home' && tourStep === null && (
        <button className="hud-prompt" style={{ '--c': nearby.color }} onClick={interact}>
          <kbd>E</kbd> Enter <strong>{nearby.name}</strong>
        </button>
      )}

      <Minimap />
      {!panel && <Joystick />}
      <TourCard />
      <Onboarding />
    </>
  );
}
