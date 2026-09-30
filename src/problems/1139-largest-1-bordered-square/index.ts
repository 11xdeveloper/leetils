/**
 * 1139. Largest 1-Bordered Square
 *
 * Returns the number of cells in the largest square of `grid` whose border
 * is all 1s, or 0 if there's none.
 *
 * Counts, for each cell, the run of 1s ending there going left and going
 * up. A square with bottom-right corner `(r, c)` and side `k` works if the
 * runs at that corner reach `k` both ways, the run left from the
 * bottom-left corner reaches up `k`, and the run up from the top-right
 * corner reaches left `k`.
 *
 * @see https://leetcode.com/problems/largest-1-bordered-square/
 * @difficulty Medium
 * @timeComplexity O(mn · min(m, n))
 * @spaceComplexity O(mn)
 *
 * @example
 * largest1BorderedSquare([[1, 1, 1], [1, 0, 1], [1, 1, 1]]); // 9
 */
export const largest1BorderedSquare = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const left = Array.from({ length: m }, () => new Array<number>(n).fill(0));
	const up = Array.from({ length: m }, () => new Array<number>(n).fill(0));
	let best = 0;
	for (let r = 0; r < m; r++) {
		const [leftRow, upRow] = [left[r] ?? [], up[r] ?? []];
		for (let c = 0; c < n; c++) {
			if (grid[r]?.[c] !== 1) continue;
			leftRow[c] = (leftRow[c - 1] ?? 0) + 1;
			upRow[c] = (up[r - 1]?.[c] ?? 0) + 1;
			for (
				let side = Math.min(leftRow[c] ?? 0, upRow[c] ?? 0);
				side > best;
				side--
			) {
				if (
					(up[r]?.[c - side + 1] ?? 0) >= side &&
					(left[r - side + 1]?.[c] ?? 0) >= side
				) {
					best = side;
				}
			}
		}
	}
	return best * best;
};
