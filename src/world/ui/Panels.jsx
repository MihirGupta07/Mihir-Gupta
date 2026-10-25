import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight, Copy, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { PERSONAL_INFO, SOCIAL_LINKS, SKILLS, STATS, EXPERIENCE, EDUCATION, RESEARCH, CONTACT_INFO, PROJECTS } from '@/data/constants';
import { useWorld, setState } from '../store';
import { destById, PEDESTALS, pedestalBySlug, SECRET } from '../data';
import { closePanel, openPanel, travelToProject } from '../actions';

const Ext = ({ href, children, className = 'pl-link' }) =>
  href ? <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={14} aria-hidden /></a> : null;

const pad = (n) => String(n).padStart(2, '0');

function copyEmail() {
  navigator.clipboard?.writeText(PERSONAL_INFO.email).then(
    () => toast.success('Email copied'),
    () => toast.error('Copy failed — select the address instead'),
  );
}

function About() {
  return (
    <>
      <p className="pl-lead">{PERSONAL_INFO.tagline}</p>
      <figure className="pl-portrait">
        {/* <img src={PERSONAL_INFO.avatar} alt={`Portrait of ${PERSONAL_INFO.name}`} loading="lazy" /> */}
        <figcaption>{PERSONAL_INFO.location} · {CONTACT_INFO.availability}</figcaption>
      </figure>
      <p className="pl-body">{PERSONAL_INFO.description}</p>
      <dl className="pl-stats">
        {STATS.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}
      </dl>
      <h3 className="pl-h3">Toolkit</h3>
      <div className="pl-toolkit">
        {Object.entries(SKILLS).map(([group, list]) => (
          <div key={group}>
            <h4>{group.replace('_', ' ')}</h4>
            <p>{list.map((s) => s.name).join(' · ')}</p>
          </div>
        ))}
      </div>
      <h3 className="pl-h3">Education</h3>
      {EDUCATION.map((e) => <p key={e.id} className="pl-body">{e.degree}, {e.school} <span className="pl-meta">{e.period}</span></p>)}
      <div className="pl-actions">
        <Ext href={PERSONAL_INFO.resume}>Résumé</Ext>
        <Ext href={SOCIAL_LINKS.github}>GitHub</Ext>
        <Ext href={SOCIAL_LINKS.linkedin}>LinkedIn</Ext>
      </div>
    </>
  );
}

function ProjectIndex() {
  return (
    <>
      <p className="pl-lead">Each pedestal in the Nexus holds one shipped project. Walk up to one, or pick it here.</p>
      <ol className="pl-index">
        {PEDESTALS.map((p, k) => (
          <li key={p.slug} style={{ '--pc': p.color }}>
            <button onClick={() => travelToProject(p.slug)}>
              <img src={p.project.image} alt="" loading="lazy" />
              <span className="pl-index__t">
                <strong>{p.project.title}</strong>
                <span>{p.project.technologies.slice(0, 4).join(' · ')}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}

function CaseStudy({ slug }) {
  const p = pedestalBySlug[slug];
  if (!p) return <ProjectIndex />;
  const k = PEDESTALS.indexOf(p);
  const prev = PEDESTALS[(k - 1 + PEDESTALS.length) % PEDESTALS.length];
  const next = PEDESTALS[(k + 1) % PEDESTALS.length];
  const { project } = p;
  return (
    <div style={{ '--pc': p.color }}>
      <p className="pl-meta">Project {pad(k + 1)} / {pad(PROJECTS.length)}</p>
      <figure className="pl-shot"><img src={project.image} alt={`${project.title} screenshot`} /></figure>
      <p className="pl-body pl-body--lg">{project.description}</p>
      {project.problem && <><h3 className="pl-h3">Problem</h3><p className="pl-body">{project.problem}</p></>}
      {project.solution && <><h3 className="pl-h3">Solution</h3><p className="pl-body">{project.solution}</p></>}
      <h3 className="pl-h3">Stack</h3>
      <ul className="pl-chips">{project.technologies.map((t) => <li key={t}>{t}</li>)}</ul>
      <div className="pl-actions">
        <Ext href={project.liveUrl} className="pl-btn">Open live</Ext>
        <Ext href={project.githubUrl}>Source</Ext>
      </div>
      <nav className="pl-pager" aria-label="Other projects">
        <button onClick={() => travelToProject(prev.slug)}><ArrowLeft size={14} aria-hidden /> {prev.project.title}</button>
        <button onClick={() => travelToProject(next.slug)}>{next.project.title} <ArrowRight size={14} aria-hidden /></button>
      </nav>
    </div>
  );
}

function Experience() {
  return (
    <>
      <p className="pl-lead">Six levels, climbed from the ground up. Hover a level to light its tier on the Citadel.</p>
      <ol className="pl-levels">
        {EXPERIENCE.map((e, k) => (
          <li key={e.id} onMouseEnter={() => setState({ focus: e.id })} onMouseLeave={() => setState({ focus: null })}
            onFocus={() => setState({ focus: e.id })} onBlur={() => setState({ focus: null })} tabIndex={0}>
            <div className="pl-levels__n">L{pad(EXPERIENCE.length - k)}</div>
            <div>
              <h3>{e.title} <span>{e.company}</span></h3>
              <p className="pl-meta">{e.period} · {e.location}</p>
              {e.description && <p className="pl-body">{e.description}</p>}
              {e.achievements?.length > 0 && <ul className="pl-list">{e.achievements.map((a) => <li key={a}>{a}</li>)}</ul>}
            </div>
          </li>
        ))}
      </ol>
      <h3 className="pl-h3">Foundation</h3>
      {EDUCATION.map((e) => <p key={e.id} className="pl-body">{e.degree}, {e.school} <span className="pl-meta">{e.period} · {e.location}</span></p>)}
    </>
  );
}

function Research() {
  return (
    <>
      <p className="pl-lead">Two published papers, one on security and one on health.</p>
      {RESEARCH.map((r, k) => (
        <article key={r.id} className="pl-paper">
          <p className="pl-meta">Paper {pad(k + 1)} · {r.publication}</p>
          <h3>{r.title}</h3>
          <p className="pl-body">{r.abstract}</p>
          <ul className="pl-chips">{r.keywords.map((w) => <li key={w}>{w}</li>)}</ul>
          <Ext href={r.url} className="pl-btn">Read the paper</Ext>
        </article>
      ))}
    </>
  );
}

function Contact() {
  const links = [['GitHub', SOCIAL_LINKS.github], ['LinkedIn', SOCIAL_LINKS.linkedin], ['Medium', SOCIAL_LINKS.medium], ['Instagram', SOCIAL_LINKS.instagram]].filter(([, h]) => h);
  return (
    <>
      <p className="pl-lead">{CONTACT_INFO.availability}. {CONTACT_INFO.response_time}.</p>
      <div className="pl-email">
        <a href={SOCIAL_LINKS.email}>{PERSONAL_INFO.email}</a>
        <button className="pl-btn" onClick={copyEmail}><Copy size={14} aria-hidden /> Copy</button>
      </div>
      <ul className="pl-socials">
        {links.map(([name, href]) => <li key={name}><Ext href={href}>{name}</Ext></li>)}
        <li><Ext href={PERSONAL_INFO.resume}>Résumé (PDF)</Ext></li>
      </ul>
      <p className="pl-meta">{CONTACT_INFO.location}</p>
    </>
  );
}

function Darkroom() {
  return (
    <>
      <p className="pl-lead">You wandered off the paths and found it. Off the clock, I make photographs and write.</p>
      <div className="pl-actions">
        <Ext href={SOCIAL_LINKS.instagram} className="pl-btn">Photographs · @snapsbymihir</Ext>
        <Ext href={SOCIAL_LINKS.medium}>Writing on Medium</Ext>
      </div>
    </>
  );
}

const TITLES = { about: 'About', projects: 'Selected projects', experience: 'Experience', research: 'Research', contact: 'Contact', darkroom: 'The Darkroom' };

export default function Panel() {
  const panel = useWorld((s) => s.panel);
  const heading = useRef();
  const returnFocus = useRef(null);
  const type = panel?.type;
  const slug = panel?.slug;

  useEffect(() => {
    if (!type) return;
    returnFocus.current ??= document.activeElement;
    heading.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === 'Escape' && closePanel();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [type, slug]);

  useEffect(() => {
    if (type) return;
    returnFocus.current?.focus?.({ preventScroll: true });
    returnFocus.current = null;
  }, [type]);

  const dest = type === 'darkroom' ? SECRET : destById[type];
  const project = type === 'projects' && slug ? pedestalBySlug[slug] : null;
  const color = project?.color ?? dest?.color ?? '#FFCF7A';
  const title = project ? project.project.title : TITLES[type];

  return (
    <AnimatePresence>
      {panel && (
        <motion.aside
          key={type}
          className="panel"
          role="dialog"
          aria-labelledby="panel-title"
          style={{ '--c': color }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className="panel__head">
            <p className="panel__eyebrow">{dest?.name}{project && <> · <button className="panel__crumb" onClick={() => openPanel('projects')}>All projects</button></>}</p>
            <button className="panel__close" onClick={closePanel} aria-label="Close and return to the world">
              <span>Esc</span><X size={16} aria-hidden />
            </button>
          </header>
          <div className="panel__scroll">
            <h2 id="panel-title" ref={heading} tabIndex={-1} className="panel__title">{title}</h2>
            {type === 'about' && <About />}
            {type === 'projects' && (slug ? <CaseStudy slug={slug} /> : <ProjectIndex />)}
            {type === 'experience' && <Experience />}
            {type === 'research' && <Research />}
            {type === 'contact' && <Contact />}
            {type === 'darkroom' && <Darkroom />}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
