/**
 * 4056. Number of Intersecting Interval Pairs I
 *
 * Counts the pairs of closed intervals sharing at least one point.
 *
 * @see https://leetcode.com/problems/number-of-intersecting-interval-pairs-i/
 * @difficulty Easy
 * @timeComplexity O(n²)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfIntersectingIntervalPairsI([[1, 5], [2, 4], [3, 6]]); // 3
 */
export const numberOfIntersectingIntervalPairsI = (
	intervals: readonly (readonly number[])[],
): number => {
	let count = 0;
	for (let i = 0; i < intervals.length; i++)
		for (let j = i + 1; j < intervals.length; j++) {
			const [a = 0, b = 0] = intervals[i] ?? [];
			const [c = 0, d = 0] = intervals[j] ?? [];
			if (Math.max(a, c) <= Math.min(b, d)) count++;
		}
	return count;
};
