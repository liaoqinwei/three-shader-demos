precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 position;
attribute vec2 uv;

varying vec2 v_uv;
void main() {
  v_uv = uv;
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * modelViewPosition;
}