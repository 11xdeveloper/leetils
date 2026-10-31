/**
 * 2915. Length of the Longest Subsequence That Sums to Target
 *
 * Returns the length of the longest subsequence summing to `target`, or
 * -1 if there is none.
 *
 * 0/1 knapsack, maximising the number of items for each sum.
 *
 * @see https://leetcode.com/problems/length-of-the-longest-subsequence-that-sums-to-target/
 * @difficulty Medium
 * @timeComplexity O(n · target)
 * @spaceComplexity O(target)
 *
 * @example
 * lengthOfTheLongestSubsequenceThatSumsToTarget([4, 1, 3, 2, 1, 5], 7); // 4
 */
export const lengthOfTheLongestSubsequenceThatSumsToTarget = (
	nums: readonly number[],
	target: number,
): number => {
	const longest = Array.from({ length: target + 1 }, (_, sum): number =>
		sum === 0 ? 0 : -1,
	);
	for (const num of nums)
		for (let sum = target; sum >= num; sum--)
			if ((longest[sum - num] ?? -1) >= 0)
				longest[sum] = Math.max(
					longest[sum] ?? -1,
					(longest[sum - num] ?? 0) + 1,
				);
	return longest[target] ?? -1;
};
