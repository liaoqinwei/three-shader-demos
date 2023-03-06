precision mediump float;

varying float opacity;
void main() {
  vec2 uv = gl_PointCoord;
  uv -= vec2(.5);
  float p = 1. - smoothstep(.4, .5, length(uv));

  vec4 col = vec4(0.);
  col += vec4(.5, .5, .2, p);
  col += mix(col, vec4(0, 0, 1., p * opacity), opacity);
  // if(opacity > 0.) {
  // } else {
  //   col = vec4(0.6118, 0.4, .8, p);

  // }
  gl_FragColor = col;
}