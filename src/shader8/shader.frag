precision mediump float;
varying vec2 vUv;
varying float opacity;

void main() {
  vec2 pUv = gl_PointCoord;

  vec3 color = vec3(0);
  float d = 1. - smoothstep(0., .5, distance(vec2(.5), pUv));
  color += vec3(1, 0, 0) * d;

  // gl_FragColor = vec4(color, 1.);

  gl_FragColor = vec4(color, d);
}