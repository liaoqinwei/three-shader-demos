precision mediump float;


void main() {
	// vec4 color = vec4(sin(m_uv.x / 2.), sin(m_uv.x / 2.), sin(m_uv.x), sin(m_uv.x));
	// gl_FragColor = vec4(color);
	vec2 uv = gl_PointCoord;
	vec4 color = vec4(0, 0, 0, 0);
	float circle = 1. - smoothstep(.02, .5, length(uv - vec2(.5)));
	color += vec4(vec3(0.8196, 0.0, 0.0) * circle, circle*circle*.5);
	
	gl_FragColor = color;

}