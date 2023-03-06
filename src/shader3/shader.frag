precision mediump float;
varying vec2 v_uv;
uniform float u_time;
uniform vec3 u_color;

float circle(vec2 position, float radius, vec2 center, float blur) {
	position -= center;
	return 1. - smoothstep(radius, radius + blur, length(position));
}

void main() {
	float ringSize = .01;
	// float constant = abs(sin(u_time * .1)) * .5;
	float constant = fract(u_time * .05) * (.5 - ringSize * 3.);

	float inCircle = circle(v_uv, constant, vec2(.5, .5), constant * .1) - circle(v_uv, constant - ringSize, vec2(.5, .5), (constant - ringSize) * .1);
	vec3 color = u_color * inCircle;

	gl_FragColor = vec4(color, inCircle + .5);

}