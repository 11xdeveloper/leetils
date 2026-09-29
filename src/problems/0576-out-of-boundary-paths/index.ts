/**
 * 576. Out of Boundary Paths
 *
 * A ball starts at `(startRow, startColumn)` in an `m × n` grid, and each
 * move goes one cell up, down, left or right, possibly off the grid.
 * Counts the paths of at most `maxMove` moves that end with the ball
 * leaving the grid, modulo 10^9 + 7.
 *
 * DP over moves: how many paths reach each cell after each number of
 * moves. Every path at a cell next to the edge adds one way out per side it
 * borders.
 *
 * @see https://leetcode.com/problems/out-of-boundary-paths/
 * @difficulty Medium
 * @timeComplexity O(maxMove · m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * outOfBoundaryPaths(2, 2, 2, 0, 0); // 6
 */
export const outOfBoundaryPaths = (
	m: number,
	n: number,
	maxMove: number,
	startRow: number,
	startColumn: number,
): number => {
	const MOD = 1_000_000_007;
	let paths = new Array<number>(m * n).fill(0);
	paths[startRow * n + startColumn] = 1;
	let out = 0;

	for (let move = 0; move < maxMove; move++) {
		const next = new Array<number>(m * n).fill(0);
		for (let row = 0; row < m; row++) {
			for (let col = 0; col < n; col++) {
				const count = paths[row * n + col] ?? 0;
				if (count === 0) continue;
				for (const [dr, dc] of [
					[-1, 0],
					[1, 0],
					[0, -1],
					[0, 1],
				] as const) {
					const r = row + dr;
					const c = col + dc;
					if (r < 0 || r >= m || c < 0 || c >= n) out = (out + count) % MOD;
					else next[r * n + c] = ((next[r * n + c] ?? 0) + count) % MOD;
				}
			}
		}
		paths = next;
	}

	return out;
};
