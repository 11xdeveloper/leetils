/**
 * 2099. Find Subsequence of Length K With the Largest Sum
 *
 * Returns a subsequence of `k` elements of `nums` with the largest sum.
 *
 * Pick the indices of the `k` largest values (earlier ones on ties) and
 * keep them in their original order.
 *
 * @see https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findSubsequenceOfLengthKWithTheLargestSum([2, 1, 3, 3], 2); // [3, 3]
 */
export const findSubsequenceOfLengthKWithTheLargestSum = (
	nums: readonly number[],
	k: number,
): number[] =>
	nums
		.map((_, i) => i)
		.sort((a, b) => (nums[b] ?? 0) - (nums[a] ?? 0) || a - b)
		.slice(0, k)
		.sort((a, b) => a - b)
		.map((i) => nums[i] ?? 0);
