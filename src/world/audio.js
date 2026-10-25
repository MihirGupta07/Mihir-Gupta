// Optional ambience, fully synthesised (no audio files): high wind + a low pad, plus a spatial hum
// at the Beacon and the Nexus that you hear grow as you approach. Off by default.
import { rig } from './store';
import { islandById } from './data';

let ctx, master;

function hum(freq, island) {
  const i = islandById[island];
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = freq;
  const g = ctx.createGain();
  g.gain.value = 0.5;
  const pan = new PannerNode(ctx, { panningModel: 'HRTF', distanceModel: 'exponential', refDistance: 8, rolloffFactor: 1.4, positionX: i.x, positionY: i.y + 10, positionZ: i.z });
  osc.connect(g).connect(pan).connect(master);
  osc.start();
}

function start() {
  ctx = new AudioContext();
  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // wind: filtered brown noise with a slow sweep
  const buf = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < d.length; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
  const noise = ctx.createBufferSource();
  noise.buffer = buf; noise.loop = true;
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass'; lp.frequency.value = 420;
  const lfo = ctx.createOscillator(); lfo.frequency.value = 0.05;
  const lfoGain = ctx.createGain(); lfoGain.gain.value = 220;
  lfo.connect(lfoGain).connect(lp.frequency);
  const windGain = ctx.createGain(); windGain.gain.value = 0.35;
  noise.connect(lp).connect(windGain).connect(master);
  noise.start(); lfo.start();

  // pad: A2 + E3, gently detuned
  for (const [f, det] of [[110, -4], [164.8, 5], [220, 2]]) {
    const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = f; o.detune.value = det;
    const g = ctx.createGain(); g.gain.value = 0.035;
    o.connect(g).connect(master); o.start();
  }

  hum(196, 'beacon');
  hum(293.7, 'nexus');

  const tick = () => {
    const l = ctx.listener;
    if (l.positionX) { l.positionX.value = rig.pos.x; l.positionY.value = rig.pos.y; l.positionZ.value = rig.pos.z; }
    if (l.forwardX) { l.forwardX.value = -Math.sin(rig.yaw); l.forwardZ.value = -Math.cos(rig.yaw); }
    requestAnimationFrame(tick);
  };
  tick();
}

export function setAudio(on) {
  if (on && !ctx) start();
  if (!ctx) return;
  if (on) ctx.resume();
  master.gain.setTargetAtTime(on ? 0.5 : 0, ctx.currentTime, 0.6);
}
