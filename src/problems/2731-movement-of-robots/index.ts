const MOD = 1_000_000_007;

/**
 * 2731. Movement of Robots
 *
 * Robots on a line move one unit a second in their directions in `s`,
 * swapping directions when they collide. Returns the sum of pairwise
 * distances after `d` seconds, modulo 1e9 + 7.
 *
 * A collision is indistinguishable from the robots passing through each
 * other, so just move each one `d` units, sort, and sum distances with
 * prefix sums.
 *
 * @see https://leetcode.com/problems/movement-of-robots/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * movementOfRobots([-2, 0, 2], "RLL", 3); // 8
 */
export const movementOfRobots = (
	nums: readonly number[],
	s: string,
	d: number,
): number => {
	const positions = nums
		.map((x, i) => (s.charAt(i) === "R" ? x + d : x - d))
		.sort((a, b) => a - b);
	let total = 0;
	let before = 0;
	for (const [i, position] of positions.entries()) {
		total = (total + ((i * position - before) % MOD) + MOD) % MOD;
		before += position;
	}
	return total;
};
