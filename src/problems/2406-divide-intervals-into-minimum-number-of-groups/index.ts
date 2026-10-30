/**
 * 2406. Divide Intervals Into Minimum Number of Groups
 *
 * Splits the inclusive intervals into the fewest groups of pairwise
 * non-overlapping intervals.
 *
 * That is the most intervals overlapping at any point; sweep over the
 * sorted starts and ends.
 *
 * @see https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * divideIntervalsIntoMinimumNumberOfGroups([[5, 10], [6, 8], [1, 5], [2, 3], [1, 10]]); // 3
 */
export const divideIntervalsIntoMinimumNumberOfGroups = (
	intervals: readonly (readonly number[])[],
): number => {
	const starts = intervals.map(([start = 0]) => start).sort((a, b) => a - b);
	const ends = intervals.map(([, end = 0]) => end).sort((a, b) => a - b);
	let [groups, ended] = [0, 0];
	for (const start of starts) {
		if (start > (ends[ended] ?? Infinity)) ended++;
		else groups++;
	}
	return groups;
};
