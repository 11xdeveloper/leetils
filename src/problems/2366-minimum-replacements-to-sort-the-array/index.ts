/**
 * 2366. Minimum Replacements to Sort the Array
 *
 * An operation replaces an element with two positive numbers summing to
 * it. Returns the fewest operations to make `nums` non-decreasing.
 *
 * Work from the right with a cap: split each value into the fewest parts
 * not exceeding the cap, as evenly as possible so the smallest part (the
 * next cap) is as large as possible.
 *
 * @see https://leetcode.com/problems/minimum-replacements-to-sort-the-array/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumReplacementsToSortTheArray([3, 9, 3]); // 2
 */
export const minimumReplacementsToSortTheArray = (
	nums: readonly number[],
): number => {
	let [operations, cap] = [0, Infinity];
	for (let i = nums.length - 1; i >= 0; i--) {
		const value = nums[i] ?? 0;
		const parts = Math.ceil(value / Math.min(cap, value));
		operations += parts - 1;
		cap = Math.floor(value / parts);
	}
	return operations;
};
