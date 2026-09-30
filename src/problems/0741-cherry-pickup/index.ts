/**
 * 741. Cherry Pickup
 *
 * On an `n × n` grid of cherries (1), empty cells (0) and thorns (-1), you
 * walk from the top-left to the bottom-right moving right or down, then
 * back moving left or up, picking up every cherry you pass (each only
 * once). Returns the most cherries, or 0 if the far corner can't be
 * reached.
 *
 * The return trip reversed is another trip there, so it's two walkers
 * moving together, both `t` steps from the start. The state is the two
 * rows (the columns follow), and when they share a cell its cherry counts
 * once. Each step comes from any of the four combinations of previous
 * moves.
 *
 * @see https://leetcode.com/problems/cherry-pickup/
 * @difficulty Hard
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^2)
 *
 * @example
 * cherryPickup([[0, 1, -1], [1, 0, -1], [1, 1, 1]]); // 5
 */
export const cherryPickup = (grid: readonly (readonly number[])[]): number => {
	const n = grid.length;
	const NONE = Number.NEGATIVE_INFINITY;
	// best[r1 * n + r2] is the most cherries with the walkers at rows r1 and r2 after t steps.
	let best = new Array<number>(n * n).fill(NONE);
	best[0] = grid[0]?.[0] ?? 0;

	for (let t = 1; t <= 2 * n - 2; t++) {
		const next = new Array<number>(n * n).fill(NONE);
		for (let r1 = Math.max(0, t - n + 1); r1 <= Math.min(n - 1, t); r1++) {
			for (let r2 = r1; r2 <= Math.min(n - 1, t); r2++) {
				const c1 = t - r1;
				const c2 = t - r2;
				const cell1 = grid[r1]?.[c1] ?? -1;
				const cell2 = grid[r2]?.[c2] ?? -1;
				if (cell1 === -1 || cell2 === -1) continue;
				const previous = Math.max(
					best[r1 * n + r2] ?? NONE,
					r1 > 0 ? (best[(r1 - 1) * n + r2] ?? NONE) : NONE,
					r2 > 0 ? (best[r1 * n + r2 - 1] ?? NONE) : NONE,
					r1 > 0 && r2 > 0 ? (best[(r1 - 1) * n + r2 - 1] ?? NONE) : NONE,
				);
				if (previous === NONE) continue;
				next[r1 * n + r2] = previous + cell1 + (r1 === r2 ? 0 : cell2);
			}
		}
		best = next;
	}

	return Math.max(0, best[(n - 1) * n + n - 1] ?? NONE);
};
