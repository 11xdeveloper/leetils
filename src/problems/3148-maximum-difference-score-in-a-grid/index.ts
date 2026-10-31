/**
 * 3148. Maximum Difference Score in a Grid
 *
 * Move any number of times (at least once) to a cell further down in the
 * same column or further right in the same row, scoring the difference in
 * values each time. Returns the best total score.
 *
 * The total telescopes to the last value minus the first, and any cell
 * down and to the right is reachable. So for each cell, subtract the
 * smallest value strictly above-left of it, kept as running minima.
 *
 * @see https://leetcode.com/problems/maximum-difference-score-in-a-grid/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumDifferenceScoreInAGrid([[9, 5, 7, 3], [8, 9, 6, 1], [6, 7, 14, 3], [2, 5, 3, 1]]); // 9
 */
export const maximumDifferenceScoreInAGrid = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid[0]?.length ?? 0;
	const minAbove = new Float64Array(n).fill(Number.POSITIVE_INFINITY);
	let best = Number.NEGATIVE_INFINITY;
	for (const row of grid) {
		let minLeft = Number.POSITIVE_INFINITY;
		row.forEach((value, c) => {
			const before = Math.min(minLeft, minAbove[c] ?? 0);
			best = Math.max(best, value - before);
			const here = Math.min(before, value);
			minAbove[c] = here;
			minLeft = here;
		});
	}
	return best;
};
