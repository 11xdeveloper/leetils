/**
 * 3197. Find the Minimum Area to Cover All Ones II
 *
 * The smallest total area of three non-overlapping axis-aligned rectangles,
 * each with at least one 1, that together cover every 1 in the grid.
 *
 * Three disjoint rectangles can always be separated by straight cuts: two
 * parallel cuts, or one cut with one side cut again across it. Try every
 * such split into three regions and add up each region's bounding box of
 * 1s.
 *
 * @see https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-ii/
 * @difficulty Hard
 * @timeComplexity O(m² · n²)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheMinimumAreaToCoverAllOnesII([[1, 0, 1], [1, 1, 1]]); // 5
 */
export const findTheMinimumAreaToCoverAllOnesII = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const INF = Number.POSITIVE_INFINITY;
	/** Bounding box area of the 1s in rows [r1, r2) and columns [c1, c2), or ∞ if none. */
	const box = (r1: number, r2: number, c1: number, c2: number): number => {
		let [top, bottom, left, right] = [INF, -1, INF, -1];
		for (let r = r1; r < r2; r++)
			for (let c = c1; c < c2; c++)
				if (grid[r]?.[c] === 1) {
					top = Math.min(top, r);
					bottom = Math.max(bottom, r);
					left = Math.min(left, c);
					right = Math.max(right, c);
				}
		return bottom === -1 ? INF : (bottom - top + 1) * (right - left + 1);
	};
	let best = INF;
	for (let a = 1; a < m; a++) {
		for (let b = a + 1; b < m; b++)
			best = Math.min(
				best,
				box(0, a, 0, n) + box(a, b, 0, n) + box(b, m, 0, n),
			);
		for (let c = 1; c < n; c++) {
			best = Math.min(
				best,
				box(0, a, 0, n) + box(a, m, 0, c) + box(a, m, c, n),
			);
			best = Math.min(
				best,
				box(0, a, 0, c) + box(0, a, c, n) + box(a, m, 0, n),
			);
		}
	}
	for (let a = 1; a < n; a++) {
		for (let b = a + 1; b < n; b++)
			best = Math.min(
				best,
				box(0, m, 0, a) + box(0, m, a, b) + box(0, m, b, n),
			);
		for (let r = 1; r < m; r++) {
			best = Math.min(
				best,
				box(0, m, 0, a) + box(0, r, a, n) + box(r, m, a, n),
			);
			best = Math.min(
				best,
				box(0, r, 0, a) + box(r, m, 0, a) + box(0, m, a, n),
			);
		}
	}
	return best;
};
