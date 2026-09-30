/**
 * 1219. Path with Maximum Gold
 *
 * Returns the most gold collected by a walk through `grid` that starts and
 * stops anywhere, moves in the four directions, never revisits a cell and
 * never steps on a cell without gold.
 *
 * Backtracking from every gold cell. There are at most 25 gold cells, and
 * paths are limited by each cell having at most three unvisited
 * neighbours, so exhaustive search is fast enough.
 *
 * @see https://leetcode.com/problems/path-with-maximum-gold/
 * @difficulty Medium
 * @timeComplexity O(g · 3^g) for g gold cells
 * @spaceComplexity O(g)
 *
 * @example
 * pathWithMaximumGold([[0, 6, 0], [5, 8, 7], [0, 9, 0]]); // 24
 */
export const pathWithMaximumGold = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const visited = new Uint8Array(m * n);
	const walk = (r: number, c: number): number => {
		const gold = grid[r]?.[c] ?? 0;
		if (gold === 0 || c < 0 || c >= n || visited[r * n + c]) return 0;
		visited[r * n + c] = 1;
		const best = Math.max(
			walk(r - 1, c),
			walk(r + 1, c),
			walk(r, c - 1),
			walk(r, c + 1),
		);
		visited[r * n + c] = 0;
		return gold + best;
	};
	let most = 0;
	for (let r = 0; r < m; r++) {
		for (let c = 0; c < n; c++) most = Math.max(most, walk(r, c));
	}
	return most;
};
