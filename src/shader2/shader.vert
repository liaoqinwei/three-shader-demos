uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float u_time;
uniform float end_x;
uniform float max_life;

attribute vec3 position;
attribute float size;
attribute float life;

float pow2Ease(float start, float end, float t) {
	return end * t * t + start;
}

void main() {
	float speed = 10.;
	float x = pow2Ease(position.x, clamp(life / max_life * end_x, end_x / 2., end_x), fract(u_time / life * speed));
	vec4 mvPosition = projectionMatrix * modelViewMatrix * vec4(position.x + x, position.y, position.z, 1.0);

	// gl_PointSize = size ;
	gl_PointSize = size ;
	gl_Position = mvPosition;
}