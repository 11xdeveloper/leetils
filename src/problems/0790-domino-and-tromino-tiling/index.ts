/**
 * 790. Domino and Tromino Tiling
 *
 * Counts the ways to tile a 2 × `n` board with 2 × 1 dominoes and L-shaped
 * trominoes (either may be rotated), modulo 10^9 + 7.
 *
 * Considering how the last columns are covered gives the recurrence
 * `f(n) = 2 · f(n - 1) + f(n - 3)`, with `f(0) = f(1) = 1` and `f(2) = 2`.
 *
 * @see https://leetcode.com/problems/domino-and-tromino-tiling/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * dominoAndTrominoTiling(3); // 5
 */
export const dominoAndTrominoTiling = (n: number): number => {
	const MOD = 1_000_000_007;
	let [a, b, c] = [1, 1, 2];
	if (n <= 2) return [a, b, c][n] ?? 1;
	for (let i = 3; i <= n; i++) [a, b, c] = [b, c, (2 * c + a) % MOD];
	return c;
};
