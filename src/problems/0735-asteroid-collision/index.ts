/**
 * 735. Asteroid Collision
 *
 * Asteroids in a row move right (positive) or left (negative) at the same
 * speed, with size `|value|`. When two meet, the smaller explodes, or both
 * if they're equal. Returns the asteroids left after every collision.
 *
 * A stack of survivors so far. Each left-moving asteroid collides with the
 * right-moving ones on top of the stack until it's destroyed or none are
 * left.
 *
 * @see https://leetcode.com/problems/asteroid-collision/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * asteroidCollision([5, 10, -5]); // [5, 10]
 */
export const asteroidCollision = (asteroids: readonly number[]): number[] => {
	const stack: number[] = [];
	for (const asteroid of asteroids) {
		let alive = true;
		while (alive && asteroid < 0 && (stack.at(-1) ?? 0) > 0) {
			const top = stack.at(-1) ?? 0;
			if (top <= -asteroid) stack.pop();
			if (top >= -asteroid) alive = false;
		}
		if (alive) stack.push(asteroid);
	}
	return stack;
};
