// Post-build: inject static HTML built from constants.js into dist/index.html <div id="root">.
// React's createRoot().render() replaces it on load; non-JS crawlers (LLM bots, curl) get the full text.
import { createServer } from 'vite';
import { readFileSync, writeFileSync } from 'node:fs';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const C = await vite.ssrLoadModule('/src/data/constants.js');
await vite.close();

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const li = (arr) => arr.map((x) => `<li>${esc(x)}</li>`).join('');
const a = (href, text) => (href ? `<a href="${esc(href)}">${esc(text)}</a>` : '');

const skills = Object.entries(C.SKILLS)
  .map(([group, list]) => `<h3>${esc(group.replace('_', ' '))}</h3><ul>${li(list.map((s) => s.name))}</ul>`)
  .join('');

const projects = C.PROJECTS.map((p) => `
  <article><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
  <p>Tech: ${esc(p.technologies.join(', '))}</p>
  <p>${a(p.liveUrl, 'Live')} ${a(p.githubUrl, 'GitHub')}</p></article>`).join('');

const experience = C.EXPERIENCE.map((e) => `
  <article><h3>${esc(e.title)} — ${esc(e.company)}</h3><p>${esc(e.period)} · ${esc(e.location)}</p>
  ${e.description ? `<p>${esc(e.description)}</p>` : ''}
  ${e.achievements?.length ? `<ul>${li(e.achievements)}</ul>` : ''}</article>`).join('');

const research = C.RESEARCH.map((r) => `
  <article><h3>${a(r.url, r.title)}</h3><p>${esc(r.publication)}</p><p>${esc(r.abstract)}</p>
  <p>Keywords: ${esc(r.keywords.join(', '))}</p></article>`).join('');

const education = C.EDUCATION.map((e) => `<p>${esc(e.degree)}, ${esc(e.school)} (${esc(e.period)})</p>`).join('');

const html = `
<main>
<section id="home"><h1>${esc(C.PERSONAL_INFO.name)}</h1><p>${esc(C.PERSONAL_INFO.title)} — ${esc(C.PERSONAL_INFO.tagline)}</p><p>${esc(C.PERSONAL_INFO.description)}</p></section>
<section id="about"><h2>About</h2><p>Based in ${esc(C.PERSONAL_INFO.location)}. ${esc(C.CONTACT_INFO.availability)}.</p>${education}</section>
<section id="skills"><h2>Skills</h2>${skills}</section>
<section id="projects"><h2>Projects</h2>${projects}</section>
<section id="experience"><h2>Experience</h2>${experience}</section>
<section id="research"><h2>Research</h2>${research}</section>
<section id="contact"><h2>Contact</h2><p>${a(C.SOCIAL_LINKS.email, C.PERSONAL_INFO.email)} · ${a(C.SOCIAL_LINKS.github, 'GitHub')} · ${a(C.SOCIAL_LINKS.linkedin, 'LinkedIn')} · ${a(C.SOCIAL_LINKS.medium, 'Medium')}</p></section>
</main>`;

const file = 'dist/index.html';
const out = readFileSync(file, 'utf8').replace('<div id="root"></div>', `<div id="root">${html}</div>`);
if (out === readFileSync(file, 'utf8')) throw new Error('#root placeholder not found in dist/index.html');
writeFileSync(file, out);
console.log(`prerender: injected ${html.length} chars into ${file}`);
