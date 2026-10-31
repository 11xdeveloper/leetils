/**
 * 4001. Aggregate Two Time Series
 *
 * At every timestamp in either series, adds the two series' values. A
 * series missing that timestamp uses its next later value, or 0.
 *
 * Merge the timestamps with two pointers; each pointer's current entry is
 * the series' value for every timestamp up to it.
 *
 * @see https://leetcode.com/problems/aggregate-two-time-series/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * aggregateTwoTimeSeries([[1, 3], [4, 1]], [[2, 2], [5, 2]]); // [[1, 5], [2, 3], [4, 3], [5, 2]]
 */
export const aggregateTwoTimeSeries = (
	series1: readonly (readonly number[])[],
	series2: readonly (readonly number[])[],
): number[][] => {
	const result: number[][] = [];
	let [i, j] = [0, 0];
	while (i < series1.length || j < series2.length) {
		const [t1 = Number.POSITIVE_INFINITY, v1 = 0] = series1[i] ?? [];
		const [t2 = Number.POSITIVE_INFINITY, v2 = 0] = series2[j] ?? [];
		const time = Math.min(t1, t2);
		result.push([time, v1 + v2]);
		if (t1 === time) i++;
		if (t2 === time) j++;
	}
	return result;
};
