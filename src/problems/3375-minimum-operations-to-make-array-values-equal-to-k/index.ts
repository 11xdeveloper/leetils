/**
 * 3375. Minimum Operations to Make Array Values Equal to K
 *
 * An operation picks a value h such that everything above h is equal, and
 * lowers those elements to h. Returns the fewest operations to make every
 * element `k`, or -1.
 *
 * Nothing can rise, so any element below `k` makes it impossible.
 * Otherwise each distinct value above `k` takes one operation to bring
 * down to the next one.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-array-values-equal-to-k/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToMakeArrayValuesEqualToK([5, 2, 5, 4, 5], 2); // 2
 */
export const minimumOperationsToMakeArrayValuesEqualToK = (
	nums: readonly number[],
	k: number,
): number => {
	if (nums.some((num) => num < k)) return -1;
	return new Set(nums.filter((num) => num > k)).size;
};
