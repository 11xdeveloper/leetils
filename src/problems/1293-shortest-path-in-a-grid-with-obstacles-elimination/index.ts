/**
 * 1293. Shortest Path in a Grid with Obstacles Elimination
 *
 * Returns the fewest steps from the top-left to the bottom-right of `grid`
 * (0 for empty, 1 for obstacle), moving in four directions and passing
 * through at most `k` obstacles, or -1.
 *
 * Breadth-first search over (cell, obstacles still allowed) states. If `k`
 * is enough to go straight through anything on a shortest Manhattan path,
 * the answer is just that distance.
 *
 * @see https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/
 * @difficulty Hard
 * @timeComplexity O(mn · min(k, m + n))
 * @spaceComplexity O(mn · min(k, m + n))
 *
 * @example
 * shortestPathInAGridWithObstaclesElimination([[0, 1, 1], [1, 1, 1], [1, 0, 0]], 1); // -1
 */
export const shortestPathInAGridWithObstaclesElimination = (
	grid: readonly (readonly number[])[],
	k: number,
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	if (k >= m + n - 3) return m + n - 2;
	const width = k + 1;
	const seen = new Uint8Array(m * n * width);
	seen[k] = 1;
	let frontier = [k];
	for (let steps = 0; frontier.length > 0; steps++) {
		const next: number[] = [];
		for (const state of frontier) {
			const [cell, left] = [Math.floor(state / width), state % width];
			const [r, c] = [Math.floor(cell / n), cell % n];
			if (r === m - 1 && c === n - 1) return steps;
			for (const [r2, c2] of [
				[r - 1, c],
				[r + 1, c],
				[r, c - 1],
				[r, c + 1],
			] as const) {
				if (r2 < 0 || r2 >= m || c2 < 0 || c2 >= n) continue;
				const remaining = left - (grid[r2]?.[c2] ?? 0);
				const nextState = (r2 * n + c2) * width + remaining;
				if (remaining < 0 || seen[nextState]) continue;
				seen[nextState] = 1;
				next.push(nextState);
			}
		}
		frontier = next;
	}
	return -1;
};
