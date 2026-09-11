import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PLAYER, SCREENS } from './config';
import Screen from './screens';
import './mc.css';

const XP_PER_LEVEL = 8;

/** Loads a background image; returns the url once it decodes, else null. */
function useLoadedBg(src) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(false);
    if (!src) return;
    const img = new Image();
    img.onload = () => setOk(true);
    img.src = src;
    return () => { img.onload = null; };
  }, [src]);
  return ok;
}

export default function MinecraftPortfolio() {
  const [i, setI] = useState(0);
  const [visited, setVisited] = useState(() => new Set([SCREENS[0].id]));
  const [toast, setToast] = useState(null);
  const [tipState, setTipState] = useState(null);
  const wheelLock = useRef(0);

  const s = SCREENS[i];
  const bgReady = useLoadedBg(s.bg);

  const xp = useMemo(
    () => SCREENS.filter((x) => visited.has(x.id)).reduce((a, x) => a + x.xp, 0),
    [visited]
  );
  const level = Math.floor(xp / XP_PER_LEVEL);
  const xpPct = ((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;

  const goIndex = useCallback((next) => {
    const n = (next + SCREENS.length) % SCREENS.length;
    setI(n);
    setTipState(null);
    setVisited((prev) => {
      if (prev.has(SCREENS[n].id)) return prev;
      setToast({ icon: SCREENS[n].icon, title: 'Advancement Made!', body: SCREENS[n].tooltip[0] });
      return new Set(prev).add(SCREENS[n].id);
    });
  }, []);

  const go = useCallback(
    (id) => goIndex(SCREENS.findIndex((x) => x.id === id)),
    [goIndex]
  );

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key >= '1' && e.key <= '9') {
        const n = Number(e.key) - 1;
        if (n < SCREENS.length) goIndex(n);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goIndex(i + 1);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goIndex(i - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, goIndex]);

  const onWheel = (e) => {
    const now = Date.now();
    if (now - wheelLock.current < 320) return;
    wheelLock.current = now;
    goIndex(i + (e.deltaY > 0 ? 1 : -1));
  };

  // Spread onto anything hoverable to get a Minecraft item tooltip.
  const tip = useCallback(
    (lines, rarity = 'common') => ({
      onMouseEnter: (e) => setTipState({ lines, rarity, x: e.clientX, y: e.clientY }),
      onMouseMove: (e) => setTipState((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : t)),
      onMouseLeave: () => setTipState(null),
    }),
    []
  );

  return (
    <div className="mc-root" onWheel={onWheel}>
      <div className="mc-bg" style={{ background: s.gradient }} />
      {bgReady && (
        <div className="mc-bg mc-bg-img" style={{ backgroundImage: `url(${s.bg})` }} />
      )}
      <div className="mc-vignette" />

      <div className="mc-f3">
        <div>{PLAYER.worldTitle} v1.0.0</div>
        <div>Biome: <span>{s.biome}</span></div>
        <div>Level {level} · {xp} XP · {visited.size}/{SCREENS.length} explored</div>
      </div>

      {toast && (
        <div className="mc-toast">
          <div className="mc-slot" style={{ width: 36, height: 36, fontSize: 20 }}>{toast.icon}</div>
          <div>
            <div style={{ color: 'var(--mc-yellow)', fontSize: 17 }}>{toast.title}</div>
            <div style={{ color: '#fff' }}>{toast.body}</div>
          </div>
        </div>
      )}

      <div className="mc-stage mc-scroll" key={s.id}>
        <Screen s={s} go={go} tip={tip} />
      </div>

      <div className="mc-hud">
        <div className="mc-bars">
          <div>{'❤'.repeat(PLAYER.hearts)}</div>
          <div>{'🍗'.repeat(PLAYER.hunger)}</div>
        </div>
        <div className="mc-xpbar">
          <div className="mc-xplevel">{level}</div>
          <div className="mc-xpfill" style={{ width: `${xpPct}%` }} />
        </div>
        <div className="mc-hotbar">
          {SCREENS.map((x, n) => (
            <div
              key={x.id}
              className={`mc-hotslot${n === i ? ' sel' : ''}`}
              onClick={() => goIndex(n)}
              {...tip(x.tooltip, n === i ? 'legendary' : 'common')}
            >
              <span className="mc-hotnum">{n + 1}</span>
              {x.icon}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 15, color: '#d0d0d0' }}>
          Press 1-9 · arrow keys · scroll to cycle
        </div>
      </div>

      {tipState && (
        <div
          className="mc-tip"
          style={{
            left: Math.min(tipState.x + 14, window.innerWidth - 310),
            top: Math.max(tipState.y - 46, 8),
          }}
        >
          <div className={`t0 ${tipState.rarity}`}>{tipState.lines[0]}</div>
          {tipState.lines.slice(1).map((l) => (
            <div key={l} className="t1">{l}</div>
          ))}
        </div>
      )}
    </div>
  );
}
