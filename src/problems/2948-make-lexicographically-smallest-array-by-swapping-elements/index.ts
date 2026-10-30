/**
 * 2948. Make Lexicographically Smallest Array by Swapping Elements
 *
 * Two elements may swap if they differ by at most `limit`. Returns the
 * lexicographically smallest array reachable.
 *
 * Sorted values chain into groups where neighbours are within `limit`;
 * anything in a group can reach any position held by the group. Give
 * each group's positions its values in sorted order.
 *
 * @see https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * makeLexicographicallySmallestArrayBySwappingElements([1, 7, 6, 18, 2, 1], 3); // [1, 6, 7, 18, 1, 2]
 */
export const makeLexicographicallySmallestArrayBySwappingElements = (
	nums: readonly number[],
	limit: number,
): number[] => {
	const order = nums
		.map((_, i) => i)
		.sort((a, b) => (nums[a] ?? 0) - (nums[b] ?? 0));
	const result = [...nums];
	for (let start = 0; start < order.length; ) {
		let end = start + 1;
		while (
			end < order.length &&
			(nums[order[end] ?? 0] ?? 0) - (nums[order[end - 1] ?? 0] ?? 0) <= limit
		)
			end++;
		const group = order.slice(start, end);
		const positions = group.toSorted((a, b) => a - b);
		for (const [k, position] of positions.entries())
			result[position] = nums[group[k] ?? 0] ?? 0;
		start = end;
	}
	return result;
};
