// Shared GLSL. Colours are authored in sRGB and converted with toLinear() before output.
export const NOISE = /* glsl */ `
float hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1,0)), f.x), mix(hash21(i + vec2(0,1)), hash21(i + vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * vnoise(p); p = p * 2.03 + 17.1; a *= 0.5; } return v; }
vec3 toLinear(vec3 c){ return pow(max(c, 0.0), vec3(2.2)); }
`;

// Sky colour for a view direction. The sun has just set at -z.
export const SKY = /* glsl */ `
vec3 skyColor(vec3 d){
  vec3 zen = vec3(0.043, 0.063, 0.188), vio = vec3(0.165, 0.122, 0.31);
  vec3 rose = vec3(0.878, 0.439, 0.353), amber = vec3(0.949, 0.651, 0.353), gold = vec3(1.0, 0.85, 0.63);
  float h = d.y;
  float sd = max(-d.z, 0.0) / max(length(d.xz), 1e-5); // no normalize(): d.xz is zero straight up/down (NaN)
  vec3 col = mix(mix(rose * 0.55 + vio * 0.45, rose, pow(sd, 2.0)), vio, smoothstep(0.0, 0.25, h));
  col = mix(col, zen, smoothstep(0.2, 0.75, h));
  float band = exp(-abs(h) * 12.0);
  col = mix(col, amber, band * (0.15 + 0.7 * pow(sd, 3.0)));
  col += gold * (pow(max(dot(d, normalize(vec3(0.0, -0.03, -1.0))), 0.0), 40.0) * 0.8 + band * pow(sd, 8.0) * 0.25);
  return col;
}
`;
