precision mediump float;
varying vec2 v_uv;
varying vec3 u_position;

uniform float u_time;
uniform vec3 u_color;

float circle(vec2 position, float radius, vec2 center, float blur) {
	position -= center;
	return 1. - smoothstep(radius, radius + blur, length(position));
}

float rect(vec2 position, vec2 center, vec2 size) {
	vec2 pt = position - center;
	vec2 halfSize = size * .5;
	float horz = step(-halfSize.x, pt.x) - step(halfSize.x, pt.x);
	float vert = step(-halfSize.y, pt.y) - step(halfSize.y, pt.y);

	return horz * vert;
}

mat2 getRotationMat(float theta) {
	float c = cos(theta);
	float s = sin(theta);

	return mat2(c, -s, s, c);
}

mat2 getScaleMat(vec2 scale) {
	scale = 1. / scale;
	return mat2(scale.x, 0, 0, scale.y);
}
void main() {
	vec2 center = vec2(0, 0);
	mat2 rotationMat = getRotationMat(u_time);
	mat2 scaleMat = getScaleMat(vec2(1.));

	vec2 pt = rotationMat * scaleMat * u_position.xy;
	float inRect = rect(pt, center, vec2(.5));

	vec3 color = u_color;
	color = color * inRect;

	gl_FragColor = vec4(color, 1.);
}