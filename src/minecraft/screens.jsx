import React, { useState } from 'react';

// Every screen gets: { s (screen config), go(id), tip(lines, rarity) }
// `tip` returns mouse handlers — spread it onto anything hoverable.

const Menu = ({ s, go, tip }) => (
  <div className="mc-fade" style={{ textAlign: 'center' }}>
    <h1
      className="mc-pixel"
      style={{ fontSize: 'clamp(28px,6vw,64px)', color: '#fff', textShadow: '5px 5px 0 rgba(0,0,0,.7)' }}
    >
      {s.data.title}
    </h1>
    <div style={{ margin: '10px 0 26px', letterSpacing: '.35em', color: '#d9d9d9' }}>
      SURVIVAL · HARD MODE
    </div>
    <div style={{ display: 'grid', gap: 8, width: 'min(340px,86vw)', margin: '0 auto' }}>
      {s.data.buttons.map((b) => (
        <button key={b.to} className="mc-btn" onClick={() => go(b.to)} {...tip([b.label, `Go to ${b.to}`])}>
          {b.label}
        </button>
      ))}
    </div>
    <div style={{ marginTop: 22, fontSize: 16, color: '#c9c9c9' }}>{s.data.footer}</div>
  </div>
);

const Profile = ({ s, go, tip }) => (
  <div className="mc-panel mc-fade" style={{ width: 'min(620px,94vw)' }}>
    <div className="mc-panel-title">Player Profile</div>
    <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
      <div className="mc-slot" style={{ width: 96, height: 96, fontSize: 46 }} {...tip(['Mihir Gupta', 'Full-Stack Builder'])}>
        🧍
      </div>
      <div style={{ flex: '1 1 260px' }}>
        <p style={{ margin: '0 0 14px', color: '#dcdcdc', lineHeight: 1.25 }}>{s.data.blurb}</p>
        {s.data.rows.map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #3a3a3d', padding: '3px 0' }}>
            <span style={{ color: '#9d9d9d' }}>{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
    </div>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '16px 0 4px' }}>
      {s.data.facts.map((f) => (
        <span key={f} style={{ fontSize: 17, color: '#bdbdbd', border: '2px solid #3a3a3d', padding: '2px 8px' }}>
          {f}
        </span>
      ))}
    </div>
    <button className="mc-btn" style={{ marginTop: 14 }} onClick={() => go(s.data.cta.to)}>
      {s.data.cta.label}
    </button>
  </div>
);

const Enchant = ({ s, tip }) => (
  <div className="mc-panel mc-fade" style={{ width: 'min(680px,94vw)' }}>
    <div className="mc-panel-title">Enchantments</div>
    {s.data.map((e) => (
      <div
        key={e.name}
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '5px 0' }}
        {...tip([`${e.name} ${e.lvl}`, e.desc], 'epic')}
      >
        <span style={{ width: 34, color: 'var(--mc-purple)' }}>{e.lvl}</span>
        <span style={{ width: 'min(230px,38%)', color: '#fff' }}>{e.name}</span>
        <div className="mc-bar-track">
          <div className="mc-bar-fill" style={{ width: `${e.pct}%` }} />
        </div>
        <span style={{ width: 40, textAlign: 'right', color: '#9d9d9d' }}>{e.pct}</span>
      </div>
    ))}
    <div style={{ marginTop: 10, fontSize: 16, color: '#8f8f8f' }}>Hover an enchantment to inspect it.</div>
  </div>
);

const rarityColor = { legendary: '#ffd83d', epic: '#b06cf0', rare: '#55ffff', common: '#fff' };

const Chest = ({ s, tip }) => {
  const [sel, setSel] = useState(s.data[0]);
  const slots = [...s.data, ...Array(Math.max(0, 27 - s.data.length)).fill(null)];
  return (
    <div className="mc-panel mc-fade" style={{ width: 'min(720px,94vw)' }}>
      <div className="mc-panel-title">Chest — Completed Builds</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9,1fr)', gap: 3 }}>
        {slots.map((it, i) => (
          <div
            key={i}
            className="mc-slot"
            style={{ width: '100%', aspectRatio: '1', height: 'auto', outline: it && sel === it ? '2px solid #fff' : 'none' }}
            onClick={() => it && setSel(it)}
            {...(it ? tip([it.name, it.desc], it.rarity) : {})}
          >
            {it?.icon || ''}
          </div>
        ))}
      </div>
      {sel && (
        <div style={{ marginTop: 16, borderTop: '2px solid #3a3a3d', paddingTop: 12 }}>
          <div style={{ color: rarityColor[sel.rarity], fontSize: 24 }}>{sel.name}</div>
          <div style={{ color: '#d2d2d2', margin: '4px 0 8px' }}>{sel.desc}</div>
          {sel.lore.map((l) => (
            <div key={l} style={{ color: '#9d9d9d', fontSize: 17 }}>· {l}</div>
          ))}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
            {sel.tags.map((t) => (
              <span key={t} style={{ fontSize: 16, border: '2px solid #3a3a3d', padding: '1px 7px' }}>{t}</span>
            ))}
          </div>
          {sel.url && (
            <a className="mc-link" href={sel.url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 10 }}>
              Open build →
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const Crafting = ({ s, tip }) => (
  <div className="mc-panel mc-fade mc-scroll" style={{ width: 'min(760px,94vw)', maxHeight: '72vh', overflowY: 'auto' }}>
    <div className="mc-panel-title">Crafting — The Journey</div>
    {s.data.map((j) => (
      <div key={j.role + j.org} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: '2px solid #2f2f32' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} {...tip([`${j.role} @ ${j.org}`, j.period])}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {j.ingredients.concat(Array(Math.max(0, 3 - j.ingredients.length)).fill('')).map((ing, i) => (
              <div key={i} className="mc-slot" style={{ width: 30, height: 30, fontSize: 16 }}>{ing}</div>
            ))}
          </div>
          <span style={{ color: '#9d9d9d' }}>→</span>
          <div className="mc-slot" style={{ width: 38, height: 38, fontSize: 20 }}>{j.out}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#8f8f8f', fontSize: 16 }}>{j.period}</div>
          <div style={{ color: '#fff', fontSize: 22 }}>{j.role} · {j.org}</div>
          {j.lines.map((l) => (
            <div key={l} style={{ color: '#c2c2c2', fontSize: 17, lineHeight: 1.2 }}>· {l}</div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const Advancements = ({ s, go, tip }) => (
  <div className="mc-panel mc-fade" style={{ width: 'min(600px,94vw)' }}>
    <div className="mc-panel-title">Advancements</div>
    {s.data.map((a) => (
      <div
        key={a.name}
        style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '7px 0', opacity: a.done ? 1 : 0.45 }}
        {...tip([a.name, a.done ? 'Completed' : 'Not yet — in progress'], a.done ? 'legendary' : 'common')}
      >
        <div className="mc-slot" style={{ width: 38, height: 38, fontSize: 20 }}>{a.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#fff' }}>{a.name}</div>
          <div style={{ color: '#9d9d9d', fontSize: 17 }}>{a.desc}</div>
        </div>
        <span style={{ color: a.done ? 'var(--mc-green)' : '#666' }}>{a.done ? '✔' : '—'}</span>
      </div>
    ))}
    <button className="mc-btn" style={{ marginTop: 14 }} onClick={() => go('contact')}>Send a Message</button>
  </div>
);

const Trades = ({ s, go, tip }) => (
  <div className="mc-panel mc-fade" style={{ width: 'min(660px,94vw)' }}>
    <div className="mc-panel-title">Villager Trades</div>
    <div style={{ color: '#9d9d9d', marginTop: -8, marginBottom: 12 }}>{s.data.title}</div>
    {s.data.offers.map((o) => (
      <div
        key={o.name}
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '7px 0', borderBottom: '2px solid #2f2f32' }}
        {...tip([o.name, `${o.cost} emeralds · ${o.stock}`], 'rare')}
      >
        <div className="mc-slot" style={{ width: 40, height: 40, fontSize: 18, position: 'relative' }}>
          💚
          <span style={{ position: 'absolute', right: 2, bottom: -2, fontSize: 15, color: '#fff' }}>{o.cost}</span>
        </div>
        <span style={{ color: '#9d9d9d' }}>→</span>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#fff' }}>{o.name}</div>
          <div style={{ color: '#9d9d9d', fontSize: 17 }}>{o.desc}</div>
        </div>
        <span style={{ fontSize: 16, color: o.stock === 'Limited' ? 'var(--mc-yellow)' : 'var(--mc-green)' }}>{o.stock}</span>
      </div>
    ))}
    <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
      {s.data.stats.map(([v, l]) => (
        <div key={l} style={{ border: '2px solid #3a3a3d', padding: '6px 14px', textAlign: 'center' }}>
          <div style={{ color: '#fff', fontSize: 24 }}>{v}</div>
          <div style={{ color: '#9d9d9d', fontSize: 16 }}>{l}</div>
        </div>
      ))}
      <button className="mc-btn" onClick={() => go(s.data.cta.to)}>{s.data.cta.label}</button>
    </div>
  </div>
);

const Book = ({ s, go }) => (
  <div className="mc-book mc-fade" style={{ width: 'min(460px,94vw)' }}>
    <div style={{ fontSize: 26, marginBottom: 4 }}>Lets Connect</div>
    <div style={{ fontSize: 17, opacity: 0.75, marginBottom: 16 }}>{s.data.intro}</div>
    {s.data.lines.map(([k, v, href]) => (
      <div key={k} style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 14, letterSpacing: '.2em', opacity: 0.6 }}>{k}</div>
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" style={{ color: '#34281a' }}>{v}</a>
        ) : (
          <div>{v}</div>
        )}
      </div>
    ))}
    <div style={{ fontSize: 15, opacity: 0.55, marginBottom: 12 }}>Page 1 of 1</div>
    <button className="mc-btn" onClick={() => go(s.data.cta.to)}>{s.data.cta.label}</button>
  </div>
);

const End = ({ s, go }) => (
  <div className="mc-fade" style={{ textAlign: 'center' }}>
    <div style={{ letterSpacing: '.4em', color: '#b8b8b8', fontSize: 16 }}>THANKS FOR PLAYING</div>
    <h2 className="mc-pixel" style={{ fontSize: 'clamp(26px,5vw,52px)', color: '#e6d6ff', margin: '14px 0 20px' }}>
      {s.data.title}
    </h2>
    {s.data.lines.map((l) => (
      <div key={l} style={{ color: '#cfcfcf' }}>{l}</div>
    ))}
    <button className="mc-btn" style={{ marginTop: 22 }} onClick={() => go(s.data.cta.to)}>{s.data.cta.label}</button>
  </div>
);

const KINDS = {
  menu: Menu,
  profile: Profile,
  enchant: Enchant,
  chest: Chest,
  crafting: Crafting,
  advancements: Advancements,
  trades: Trades,
  book: Book,
  end: End,
};

export default function Screen(props) {
  const C = KINDS[props.s.kind] || Menu;
  return <C {...props} />;
}
