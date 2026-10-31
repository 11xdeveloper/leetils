/**
 * 2655. Find Maximal Uncovered Ranges
 *
 * Returns, in order, the maximal ranges of indices in `[0, n - 1]` that
 * none of the given ranges cover.
 *
 * Sort the ranges by start and sweep, emitting each gap before the next
 * range and after the last.
 *
 * @see https://leetcode.com/problems/find-maximal-uncovered-ranges/
 * @difficulty Medium
 * @timeComplexity O(r log r)
 * @spaceComplexity O(r)
 *
 * @example
 * findMaximalUncoveredRanges(10, [[3, 5], [7, 8]]); // [[0, 2], [6, 6], [9, 9]]
 */
export const findMaximalUncoveredRanges = (
	n: number,
	ranges: readonly (readonly number[])[],
): number[][] => {
	const gaps: number[][] = [];
	let next = 0;
	for (const [start = 0, end = 0] of ranges.toSorted(
		(a, b) => (a[0] ?? 0) - (b[0] ?? 0),
	)) {
		if (start > next) gaps.push([next, start - 1]);
		next = Math.max(next, end + 1);
	}
	if (next < n) gaps.push([next, n - 1]);
	return gaps;
};
