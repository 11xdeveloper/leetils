/**
 * 1272. Remove Interval
 *
 * `intervals` are sorted, disjoint half-open intervals `[a, b)`. Returns
 * them with `toBeRemoved` taken out, still sorted and disjoint.
 *
 * Each interval keeps whatever lies before the removed range and whatever
 * lies after it, if either part is non-empty.
 *
 * @see https://leetcode.com/problems/remove-interval/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n), for the result
 *
 * @example
 * removeInterval([[0, 2], [3, 4], [5, 7]], [1, 6]); // [[0, 1], [6, 7]]
 */
export const removeInterval = (
	intervals: readonly (readonly number[])[],
	toBeRemoved: readonly number[],
): number[][] => {
	const [cutStart = 0, cutEnd = 0] = toBeRemoved;
	const result: number[][] = [];
	for (const [start = 0, end = 0] of intervals) {
		if (start < Math.min(end, cutStart))
			result.push([start, Math.min(end, cutStart)]);
		if (Math.max(start, cutEnd) < end)
			result.push([Math.max(start, cutEnd), end]);
	}
	return result;
};
