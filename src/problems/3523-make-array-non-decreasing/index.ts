/**
 * 3523. Make Array Non-decreasing
 *
 * Replacing a subarray with its maximum, as often as you like, returns the
 * longest non-decreasing array you can end with.
 *
 * Each element at least as big as everything before it can end its own
 * block; everything else merges into the block before.
 *
 * @see https://leetcode.com/problems/make-array-non-decreasing/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * makeArrayNonDecreasing([4, 2, 5, 3, 5]); // 3
 */
export const makeArrayNonDecreasing = (nums: readonly number[]): number => {
	let blocks = 0;
	let max = Number.NEGATIVE_INFINITY;
	for (const num of nums)
		if (num >= max) {
			blocks++;
			max = num;
		}
	return blocks;
};
