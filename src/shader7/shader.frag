precision mediump float;

varying vec2 vUv;

uniform float uRange;
uniform float uTime;
uniform float uDuration;
uniform float uDelay;
uniform vec3 uBgColor;
uniform vec3 uFlowColor;

void main() {
  vec2 uv = vUv;
  // 管道的uv是上下面
  uv.y = abs(uv.y * 2. - 1.);
  // uv.y = fract(uv.y * 4.);

  vec3 col = uBgColor;

  float halfRange = uRange * .5;
  float current = mod(uTime, uDuration + uDelay) / uDuration;

  if(uv.x > current && uv.x < current + uRange) {
    float rate = (uv.x - current) / halfRange;
    if(rate < 1.)
      col = mix(uFlowColor, col, 1. - rate);
    else
      col = mix(uFlowColor, col, fract(rate));
  }

  float edgeThickness = .2;
  float half_scale = .3;
  float p = smoothstep(.5 - half_scale - edgeThickness, .5 - half_scale, uv.y) - smoothstep(half_scale * 2., half_scale * 2. + edgeThickness, uv.y);
  gl_FragColor = vec4(col, p);
}