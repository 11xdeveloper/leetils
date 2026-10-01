/**
 * 1920. Build Array from Permutation
 *
 * Returns `ans[i] = nums[nums[i]]` for the permutation `nums`.
 *
 * Maps each index directly.
 *
 * @see https://leetcode.com/problems/build-array-from-permutation/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * buildArrayFromPermutation([0, 2, 1, 5, 3, 4]); // [0, 1, 2, 4, 5, 3]
 */
export const buildArrayFromPermutation = (nums: readonly number[]): number[] =>
	nums.map((num) => nums[num] ?? 0);
