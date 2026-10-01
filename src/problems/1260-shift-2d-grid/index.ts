/**
 * 1260. Shift 2D Grid
 *
 * Returns `grid` after `k` shifts, each moving every element one place
 * along in row-major order, with the last wrapping round to the start.
 *
 * Reading the grid as one row-major list, the element at position `p` ends
 * up at `(p + k) mod mn`.
 *
 * @see https://leetcode.com/problems/shift-2d-grid/
 * @difficulty Easy
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn), for the result
 *
 * @example
 * shift2dGrid([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1); // [[9, 1, 2], [3, 4, 5], [6, 7, 8]]
 */
export const shift2dGrid = (
	grid: readonly (readonly number[])[],
	k: number,
): number[][] => {
	const flat = grid.flat();
	const total = flat.length;
	const n = grid[0]?.length ?? 0;
	return grid.map((_, r) =>
		Array.from({ length: n }, (_, c) => {
			const from = (((r * n + c - k) % total) + total) % total;
			return flat[from] ?? 0;
		}),
	);
};
