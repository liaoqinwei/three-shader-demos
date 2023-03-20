uniform sampler2D tDiffuse;
uniform float uTime;
varying vec3 v_worldPos;
varying vec2 vUv;

float ring(vec2 uv, vec2 center, float radius) {
  vec2 p = uv - center;
  float edge_thickness = radius *.2;
  float l = length(p);
  return smoothstep(radius - edge_thickness, radius, l) - step(radius, l);
}
void main() {
  vec2 uv = vUv;
  uv = fract(uv);
  vec4 previousPassColor = texture2D(tDiffuse, uv);
  vec3 color = vec3(0, 0, 0);
  float var = (sin(uTime)+1.)/4.;
  color += ring(uv, vec2(.5),  var) * previousPassColor.rgb *2.;
  color = mix(previousPassColor.rgb, color , uv.y);
  gl_FragColor = vec4(color, previousPassColor.a);
  // gl_FragColor = vec4(vec3(1.,.5,1),1.);
}