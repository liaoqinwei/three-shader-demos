precision mediump float;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 viewMatrix;

uniform vec2 u_resolution;

attribute vec3 position;

varying vec2 vUv;
varying float opacity;
void main() {
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = 800. / -modelViewPosition.z;
  // gl_PointSize = 20.;
  gl_Position = projectionMatrix * modelViewPosition;
}