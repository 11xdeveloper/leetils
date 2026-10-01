/**
 * 1911. Maximum Alternating Subsequence Sum
 *
 * A sequence's alternating sum adds the elements at even indices and
 * subtracts those at odd ones. Returns the largest alternating sum of a
 * subsequence of `nums`.
 *
 * Track the best sum of a subsequence ending with an added element and
 * with a subtracted one.
 *
 * @see https://leetcode.com/problems/maximum-alternating-subsequence-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumAlternatingSubsequenceSum([6, 2, 1, 2, 4, 5]); // 10
 */
export const maximumAlternatingSubsequenceSum = (
	nums: readonly number[],
): number => {
	let [added, subtracted] = [0, 0];
	for (const num of nums)
		[added, subtracted] = [
			Math.max(added, subtracted + num),
			Math.max(subtracted, added - num),
		];
	return added;
};
