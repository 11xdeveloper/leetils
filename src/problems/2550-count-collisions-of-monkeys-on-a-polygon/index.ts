const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 2550. Count Collisions of Monkeys on a Polygon
 *
 * Each of `n` monkeys on a regular polygon's vertices moves to a
 * neighbouring vertex, clockwise or anticlockwise. Returns the number of
 * ways at least two collide, modulo 1e9 + 7.
 *
 * Of the `2ⁿ` ways to move, only all-clockwise and all-anticlockwise
 * avoid a collision.
 *
 * @see https://leetcode.com/problems/count-collisions-of-monkeys-on-a-polygon/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * countCollisionsOfMonkeysOnAPolygon(3); // 6
 */
export const countCollisionsOfMonkeysOnAPolygon = (n: number): number => {
	let result = 1;
	let base = 2;
	for (let exponent = n; exponent > 0; exponent = Math.floor(exponent / 2)) {
		if (exponent % 2 === 1) result = multiply(result, base);
		base = multiply(base, base);
	}
	return (result - 2 + MOD) % MOD;
};
