precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
attribute vec3 position;
uniform float time;
varying vec2 pUv;

void main() {
  pUv = (vec2(position.x, position.y) +
    vec2(abs(position.x), abs(position.y))) /
    vec2(abs(position.x), abs(position.y)) / 2.;

  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  // modelViewPosition.z += sin(time / 10.);
  // modelViewPosition.x += sin(time / 2.) * modelViewPosition.x /2.;
  // modelViewPosition.z += sin(modelViewPosition.x * 10.0) * .5;

  gl_Position = projectionMatrix * modelViewPosition;
}