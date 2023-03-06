precision mediump float;

varying vec2 v_uv;
/* Shape 2D line */
float line(float a, float b, float line_width, float edge_thickness) {
  float half_line = line_width * .5;

  return smoothstep(a - half_line - edge_thickness, a - half_line, b) -
    smoothstep(a + half_line, a + half_line + edge_thickness, b);
}

float brick(vec2 pt, float mortar_height, float edge_thickness) {
  float result = line(pt.y, .5, mortar_height, edge_thickness);
  result += line(pt.y, 1., mortar_height, edge_thickness);
  result += line(pt.y, 0., mortar_height, edge_thickness);

  if(pt.y < .5) {
    pt.x = fract(pt.x + .5);
  }
  result += line(pt.x, .5, mortar_height, edge_thickness);
  return result;
}
void main() {

  vec2 uv = fract(v_uv * 4.);
  vec3 color = vec3(0);
  float brickV = brick(uv, .03, .005);
  color += vec3(1) * brickV;

  gl_FragColor = vec4(color, 1);
}