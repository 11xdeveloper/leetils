/**
 * 1463. Cherry Pickup II
 *
 * Two robots start at the top corners of `grid` and move down a row at a
 * time, each to one of the three cells below. Returns the most cherries they
 * can collect (a shared cell counts once).
 *
 * Both robots are always on the same row, so dynamic programming over
 * their two columns, row by row, covers every pair of paths.
 *
 * @see https://leetcode.com/problems/cherry-pickup-ii/
 * @difficulty Hard
 * @timeComplexity O(rows · cols^2)
 * @spaceComplexity O(cols^2)
 *
 * @example
 * cherryPickupII([[3, 1, 1], [2, 5, 1], [1, 5, 5], [2, 1, 1]]); // 24
 */
export const cherryPickupII = (
	grid: readonly (readonly number[])[],
): number => {
	const cols = grid[0]?.length ?? 0;
	const fresh = () =>
		Array.from({ length: cols }, () => new Array<number>(cols).fill(-Infinity));
	let best = fresh();
	const firstRow = best[0];
	if (firstRow)
		firstRow[cols - 1] =
			(grid[0]?.[0] ?? 0) + (cols > 1 ? (grid[0]?.[cols - 1] ?? 0) : 0);
	for (let r = 1; r < grid.length; r++) {
		const row = grid[r] ?? [];
		const next = fresh();
		for (let a = 0; a < cols; a++) {
			for (let b = 0; b < cols; b++) {
				const gained = (row[a] ?? 0) + (a === b ? 0 : (row[b] ?? 0));
				let previous = -Infinity;
				for (let da = -1; da <= 1; da++) {
					for (let db = -1; db <= 1; db++)
						previous = Math.max(previous, best[a + da]?.[b + db] ?? -Infinity);
				}
				const nextRow = next[a];
				if (nextRow) nextRow[b] = previous + gained;
			}
		}
		best = next;
	}
	return Math.max(...best.flat());
};
