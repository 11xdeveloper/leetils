/**
 * 2176. Count Equal and Divisible Pairs in an Array
 *
 * Counts the pairs `i < j` with `nums[i] === nums[j]` and `i · j`
 * divisible by `k`.
 *
 * Check every pair.
 *
 * @see https://leetcode.com/problems/count-equal-and-divisible-pairs-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * countEqualAndDivisiblePairsInAnArray([3, 1, 2, 2, 2, 1, 3], 2); // 4
 */
export const countEqualAndDivisiblePairsInAnArray = (
	nums: readonly number[],
	k: number,
): number => {
	let pairs = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++)
			if (nums[i] === nums[j] && (i * j) % k === 0) pairs++;
	return pairs;
};
