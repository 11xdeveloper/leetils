/**
 * 325. Maximum Size Subarray Sum Equals k
 *
 * Returns the length of the longest contiguous subarray of `nums` that adds
 * up to `k`, or 0 if there is none.
 *
 * A subarray's sum is the difference of two prefix sums. Remembering the
 * first index where each prefix sum appears, each position looks up the
 * earliest start that makes its subarray sum to `k`.
 *
 * @see https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSizeSubarraySumEqualsK([1, -1, 5, -2, 3], 3); // 4, for [1, -1, 5, -2]
 */
export const maximumSizeSubarraySumEqualsK = (
	nums: readonly number[],
	k: number,
): number => {
	const firstIndex = new Map([[0, -1]]);
	let sum = 0;
	let longest = 0;

	for (const [i, num] of nums.entries()) {
		sum += num;
		const start = firstIndex.get(sum - k);
		if (start !== undefined) longest = Math.max(longest, i - start);
		if (!firstIndex.has(sum)) firstIndex.set(sum, i);
	}

	return longest;
};
