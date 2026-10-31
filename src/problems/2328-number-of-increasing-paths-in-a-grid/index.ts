/**
 * 2328. Number of Increasing Paths in a Grid
 *
 * Counts the strictly increasing paths in `grid` (moving between adjacent
 * cells, any length including single cells), modulo 10^9 + 7.
 *
 * Visit cells in increasing order; each extends the paths ending at its
 * smaller neighbours.
 *
 * @see https://leetcode.com/problems/number-of-increasing-paths-in-a-grid/
 * @difficulty Hard
 * @timeComplexity O(m · n log(m · n))
 * @spaceComplexity O(m · n)
 *
 * @example
 * numberOfIncreasingPathsInAGrid([[1, 1], [3, 4]]); // 8
 */
export const numberOfIncreasingPathsInAGrid = (
	grid: readonly (readonly number[])[],
): number => {
	const MOD = 1_000_000_007;
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const value = (cell: number): number =>
		grid[Math.floor(cell / n)]?.[cell % n] ?? 0;
	const order = Array.from({ length: m * n }, (_, cell) => cell).sort(
		(a, b) => value(a) - value(b),
	);
	const paths = new Array<number>(m * n).fill(1);
	let total = 0;
	for (const cell of order) {
		const [r, c] = [Math.floor(cell / n), cell % n];
		for (const [nr, nc] of [
			[r - 1, c],
			[r + 1, c],
			[r, c - 1],
			[r, c + 1],
		] as const) {
			const neighbour = grid[nr]?.[nc];
			if (neighbour === undefined || neighbour >= value(cell)) continue;
			paths[cell] = ((paths[cell] ?? 0) + (paths[nr * n + nc] ?? 0)) % MOD;
		}
		total = (total + (paths[cell] ?? 0)) % MOD;
	}
	return total;
};
