precision mediump float;
uniform vec3 colorA;
uniform vec3 colorB;
uniform float time;

varying vec2 pUv;

float circle(vec2 position, float radius) {
  return 1. - smoothstep(radius, radius + .01, length(position - vec2(0.5)));
}

float rect(vec2 position, vec2 scale) {
  scale = vec2(0.5) - scale * 0.5;
  vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));
  shaper *= vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));
  return shaper.x * shaper.y;
}

void main() {
  // gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
  float circle1 = circle(pUv, .3);
  float circle2 = circle(pUv, .4);
  float eye1 = circle(pUv + vec2(-.15), .05);
  float eye2 = circle(pUv + vec2(.15, -.15), .05);
  float mouth = circle(pUv, .2) -
    circle(pUv + vec2(0, -.05), .22);
  mouth = mouth < 0. ? 0. : mouth;
  float shape = circle2 - circle1 + mouth + eye1 + eye2;
  vec3 color = vec3(shape) * vec3(abs(sin(time / 5.)), abs(sin(time / 3.)), abs(sin(time / 2.)));

  gl_FragColor = vec4(color, 1.0);
}