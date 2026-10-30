/**
 * 2790. Maximum Number of Groups With Increasing Length
 *
 * Number `i` may be used at most `usageLimits[i]` times in total. Groups
 * must each hold distinct numbers and be strictly longer than the one
 * before. Returns the most groups possible.
 *
 * `k` groups need `1 + 2 + … + k` slots, and with limits sorted
 * ascending, they fit exactly when every prefix of the limits covers the
 * corresponding triangular number. Grow `k` greedily.
 *
 * @see https://leetcode.com/problems/maximum-number-of-groups-with-increasing-length/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfGroupsWithIncreasingLength([1, 2, 5]); // 3
 */
export const maximumNumberOfGroupsWithIncreasingLength = (
	usageLimits: readonly number[],
): number => {
	let groups = 0;
	let total = 0;
	for (const limit of usageLimits.toSorted((a, b) => a - b)) {
		total += limit;
		if (total >= ((groups + 1) * (groups + 2)) / 2) groups++;
	}
	return groups;
};
