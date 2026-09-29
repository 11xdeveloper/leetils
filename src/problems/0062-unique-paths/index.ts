/**
 * 62. Unique Paths
 *
 * Returns how many paths a robot can take from the top-left to the
 * bottom-right corner of an m×n grid, moving only right or down.
 *
 * Every path is `m - 1` moves down and `n - 1` moves right in some order, so
 * the answer is the binomial coefficient C(m + n - 2, m - 1). It's computed
 * with the multiplicative formula, which stays an integer at every step.
 *
 * @see https://leetcode.com/problems/unique-paths/
 * @difficulty Medium
 * @timeComplexity O(min(m, n))
 * @spaceComplexity O(1)
 *
 * @example
 * uniquePaths(3, 7); // 28
 */
export const uniquePaths = (m: number, n: number): number => {
	const moves = m + n - 2;
	const down = Math.min(m, n) - 1;

	let paths = 1;
	for (let i = 1; i <= down; i++) {
		paths = (paths * (moves - down + i)) / i;
	}

	return paths;
};
