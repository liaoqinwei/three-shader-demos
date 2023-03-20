varying vec2 vUv;
varying vec3 v_worldPos;

void main() {
  vUv = uv;
  v_worldPos = (modelViewMatrix * vec4(position, 1.)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}