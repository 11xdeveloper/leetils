/**
 * 2132. Stamping the Grid
 *
 * Returns whether every empty cell (0) of `grid` can be covered by
 * `stampHeight × stampWidth` stamps that never cover an occupied cell (1).
 * Stamps may overlap but not rotate.
 *
 * Place a stamp everywhere it fits, which prefix sums of occupied cells
 * reveal, then count stamps over each cell with a 2D difference array.
 *
 * @see https://leetcode.com/problems/stamping-the-grid/
 * @difficulty Hard
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * stampingTheGrid([[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]], 4, 3); // true
 */
export const stampingTheGrid = (
	grid: readonly (readonly number[])[],
	stampHeight: number,
	stampWidth: number,
): boolean => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const w = n + 1;
	/** 2D prefix sums over an m × n array given by `value`. */
	const prefixSums = (value: (r: number, c: number) => number): Int32Array => {
		const sums = new Int32Array((m + 1) * w);
		for (let r = 0; r < m; r++) {
			for (let c = 0; c < n; c++) {
				sums[(r + 1) * w + c + 1] =
					value(r, c) +
					(sums[r * w + c + 1] ?? 0) +
					(sums[(r + 1) * w + c] ?? 0) -
					(sums[r * w + c] ?? 0);
			}
		}
		return sums;
	};
	/** The sum of `sums` over rows [r1, r2) and columns [c1, c2). */
	const rect = (
		sums: Int32Array,
		r1: number,
		c1: number,
		r2: number,
		c2: number,
	): number =>
		(sums[r2 * w + c2] ?? 0) -
		(sums[r1 * w + c2] ?? 0) -
		(sums[r2 * w + c1] ?? 0) +
		(sums[r1 * w + c1] ?? 0);

	const occupied = prefixSums((r, c) => grid[r]?.[c] ?? 0);
	const stampStart = new Int32Array(m * n);
	for (let r = 0; r + stampHeight <= m; r++) {
		for (let c = 0; c + stampWidth <= n; c++) {
			if (rect(occupied, r, c, r + stampHeight, c + stampWidth) === 0)
				stampStart[r * n + c] = 1;
		}
	}
	// A cell is covered if a stamp starts in the box up and left of it.
	const starts = prefixSums((r, c) => stampStart[r * n + c] ?? 0);
	for (let r = 0; r < m; r++) {
		for (let c = 0; c < n; c++) {
			if (grid[r]?.[c]) continue;
			const [r1, c1] = [
				Math.max(0, r - stampHeight + 1),
				Math.max(0, c - stampWidth + 1),
			];
			if (rect(starts, r1, c1, r + 1, c + 1) === 0) return false;
		}
	}
	return true;
};
