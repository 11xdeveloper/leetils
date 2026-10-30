/**
 * 2717. Semi-Ordered Permutation
 *
 * Returns the fewest adjacent swaps to move 1 to the front of a
 * permutation and `n` to the back.
 *
 * Each moves independently, except that if 1 starts after `n`, one swap
 * passes them over each other and counts for both.
 *
 * @see https://leetcode.com/problems/semi-ordered-permutation/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * semiOrderedPermutation([2, 4, 1, 3]); // 3
 */
export const semiOrderedPermutation = (nums: readonly number[]): number => {
	const n = nums.length;
	const first = nums.indexOf(1);
	const last = nums.indexOf(n);
	return first + (n - 1 - last) - (first > last ? 1 : 0);
};
