/**
 * 3644. Maximum K to Sort a Permutation
 *
 * `nums` is a permutation of 0 to n - 1. With some k, you may swap any two
 * values whose AND is exactly k. Returns the largest k that lets you sort
 * `nums` (0 if it's already sorted).
 *
 * Every misplaced value has to move, so k's bits are in all of them. The
 * AND of the misplaced values works: the value equal to it, in place or
 * not, can swap with every misplaced value, so it serves as a spare slot
 * for sorting them all.
 *
 * @see https://leetcode.com/problems/maximum-k-to-sort-a-permutation/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumKToSortAPermutation([0, 3, 2, 1]); // 1
 */
export const maximumKToSortAPermutation = (nums: readonly number[]): number => {
	let k = -1;
	nums.forEach((num, i) => {
		if (num !== i) k &= num;
	});
	return k === -1 ? 0 : k;
};
