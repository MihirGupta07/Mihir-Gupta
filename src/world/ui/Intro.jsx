import { useProgress } from '@react-three/drei';
import { PERSONAL_INFO } from '@/data/constants';
import { useWorld } from '../store';

export function Loader() {
  const phase = useWorld((s) => s.phase);
  const { progress, item } = useProgress();
  const done = phase !== 'loading';
  return (
    <div className={`loader${done ? ' loader--done' : ''}`} aria-hidden={done} role="status">
      <p className="loader__name">{PERSONAL_INFO.name}</p>
      <div className="loader__bar"><span style={{ transform: `scaleX(${Math.max(0.04, progress / 100)})` }} /></div>
      <p className="loader__status">
        {progress < 100 ? `Raising the islands — ${Math.round(progress)}%` : 'Lighting the paths'}
        <span className="sr-only">{item}</span>
      </p>
    </div>
  );
}

// The hero lives on top of the opening flight; text arrives as the camera settles.
export function Hero({ onEnter }) {
  const phase = useWorld((s) => s.phase);
  if (phase !== 'intro') return null;
  return (
    <section className="hero" aria-labelledby="hero-name">
      <button className="hero__skip" onClick={onEnter}>Skip intro</button>
      <div className="hero__block">
        <h1 id="hero-name" className="hero__name">
          <span>{PERSONAL_INFO.name.split(' ')[0]}</span>{' '}
          <span>{PERSONAL_INFO.name.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="hero__byline">Software Engineer · Builder <span aria-hidden>/</span> {PERSONAL_INFO.location}</p>
        <p className="hero__line">I turn ambitious ideas into software people use.</p>
        <div className="hero__actions">
          <button className="btn-gold btn-gold--lg" onClick={onEnter}>Enter my world <span aria-hidden>→</span></button>
          <button className="btn-text" onClick={onEnter}>Skip intro</button>
        </div>
      </div>
    </section>
  );
}
