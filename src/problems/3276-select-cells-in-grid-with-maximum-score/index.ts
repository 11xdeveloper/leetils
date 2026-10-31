/**
 * 3276. Select Cells in Grid With Maximum Score
 *
 * Select cells from the grid, at most one per row and with all values
 * different. Returns the largest possible sum.
 *
 * Go through the distinct values, keeping the best sum for each set of
 * used rows; each value is skipped or taken from one of the unused rows
 * holding it.
 *
 * @see https://leetcode.com/problems/select-cells-in-grid-with-maximum-score/
 * @difficulty Hard
 * @timeComplexity O(V · 2^m · m), for V distinct values and m rows
 * @spaceComplexity O(2^m + V · m)
 *
 * @example
 * selectCellsInGridWithMaximumScore([[1, 2, 3], [4, 3, 2], [1, 1, 1]]); // 8
 */
export const selectCellsInGridWithMaximumScore = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const rowsWith = new Map<number, number>();
	grid.forEach((row, r) => {
		for (const value of row)
			rowsWith.set(value, (rowsWith.get(value) ?? 0) | (1 << r));
	});
	let best = new Float64Array(1 << m).fill(Number.NEGATIVE_INFINITY);
	best[0] = 0;
	for (const [value, rows] of rowsWith) {
		const next = Float64Array.from(best);
		for (let mask = 0; mask < 1 << m; mask++) {
			const score = best[mask] ?? Number.NEGATIVE_INFINITY;
			if (score === Number.NEGATIVE_INFINITY) continue;
			for (let free = rows & ~mask; free; free &= free - 1) {
				const taken = mask | (free & -free);
				next[taken] = Math.max(next[taken] ?? 0, score + value);
			}
		}
		best = next;
	}
	return Math.max(...best);
};
