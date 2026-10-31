/**
 * 2943. Maximize Area of Square Hole in Grid
 *
 * A grid has `n + 2` horizontal and `m + 2` vertical bars; you may remove
 * any of those listed in `hBars` and `vBars`. Returns the area of the
 * largest square hole you can make.
 *
 * Removing a run of `r` consecutive bars opens a gap of `r + 1`. Take the
 * longest run in each direction; the square's side is the smaller gap.
 *
 * @see https://leetcode.com/problems/maximize-area-of-square-hole-in-grid/
 * @difficulty Medium
 * @timeComplexity O(h log h + v log v)
 * @spaceComplexity O(h + v)
 *
 * @example
 * maximizeAreaOfSquareHoleInGrid(2, 3, [2, 3], [2, 4]); // 4
 */
export const maximizeAreaOfSquareHoleInGrid = (
	_n: number,
	_m: number,
	hBars: readonly number[],
	vBars: readonly number[],
): number => {
	const widestGap = (bars: readonly number[]): number => {
		const sorted = bars.toSorted((a, b) => a - b);
		let longest = 1;
		let run = 1;
		for (let i = 1; i < sorted.length; i++) {
			run = (sorted[i] ?? 0) === (sorted[i - 1] ?? 0) + 1 ? run + 1 : 1;
			longest = Math.max(longest, run);
		}
		return longest + 1;
	};
	const side = Math.min(widestGap(hBars), widestGap(vBars));
	return side * side;
};
