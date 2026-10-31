/**
 * 2580. Count Ways to Group Overlapping Ranges
 *
 * Splits the ranges into two groups so that overlapping ranges share a
 * group. Returns the number of ways, modulo 1e9 + 7.
 *
 * Overlaps chain ranges into connected blocks, found by sorting and
 * merging; each block picks a group independently, giving `2^blocks`.
 *
 * @see https://leetcode.com/problems/count-ways-to-group-overlapping-ranges/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countWaysToGroupOverlappingRanges([[1, 3], [10, 20], [2, 5], [4, 8]]); // 4
 */
export const countWaysToGroupOverlappingRanges = (
	ranges: readonly (readonly number[])[],
): number => {
	const sorted = ranges.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	let ways = 1;
	let reach = -1;
	for (const [start = 0, end = 0] of sorted) {
		if (start > reach) ways = (ways * 2) % 1_000_000_007;
		reach = Math.max(reach, end);
	}
	return ways;
};
