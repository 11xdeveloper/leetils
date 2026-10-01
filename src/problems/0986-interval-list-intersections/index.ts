/**
 * 986. Interval List Intersections
 *
 * Given two sorted lists of disjoint closed intervals, returns their
 * intersection as a sorted list of intervals.
 *
 * Two pointers: the current pair of intervals overlaps from the later start
 * to the earlier end, if that's non-empty. Then the one ending first moves
 * on, since it can't overlap anything else.
 *
 * @see https://leetcode.com/problems/interval-list-intersections/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * intervalListIntersections([[0, 2], [5, 10]], [[1, 5], [8, 12]]); // [[1, 2], [5, 5], [8, 10]]
 */
export const intervalListIntersections = (
	firstList: readonly (readonly number[])[],
	secondList: readonly (readonly number[])[],
): number[][] => {
	const result: number[][] = [];
	for (let i = 0, j = 0; i < firstList.length && j < secondList.length; ) {
		const [aStart = 0, aEnd = 0] = firstList[i] ?? [];
		const [bStart = 0, bEnd = 0] = secondList[j] ?? [];
		const start = Math.max(aStart, bStart);
		const end = Math.min(aEnd, bEnd);
		if (start <= end) result.push([start, end]);
		if (aEnd < bEnd) i++;
		else j++;
	}
	return result;
};
