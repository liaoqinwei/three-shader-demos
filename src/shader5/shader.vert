precision mediump float;

attribute vec3 position;
attribute float current;
// three
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
// user
uniform float uTime;
uniform float uDuration;
uniform float uRange;

varying float opacity;

const float PI = 3.14159265359;
mat2 rotate2d(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, s, -s, c);
}
void main() {
  float rate = mod(uTime * .5, uDuration) / uDuration;
  // vec2 pXZ = rotate2d(PI * .5) * vec2(position.x, position.z);
  vec4 modelP = modelViewMatrix * vec4(position, 1.0);
  opacity = .0;
  if((current > rate && current < rate + uRange) || (uRange + rate > 1. && current < fract(rate + uRange))) {
    opacity = max((current - rate) / uRange, opacity);

  }
  gl_PointSize = 800. / -modelP.z;

  gl_Position = projectionMatrix * modelP;
}