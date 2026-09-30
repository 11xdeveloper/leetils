/**
 * 1027. Longest Arithmetic Subsequence
 *
 * Returns the length of the longest arithmetic subsequence of `nums` (at
 * least two elements, constant difference).
 *
 * For each index and difference, the longest arithmetic subsequence ending
 * there: extending the one ending at an earlier index with the same
 * difference.
 *
 * @see https://leetcode.com/problems/longest-arithmetic-subsequence/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * longestArithmeticSubsequence([9, 4, 7, 2, 10]); // 3: [4, 7, 10]
 */
export const longestArithmeticSubsequence = (
	nums: readonly number[],
): number => {
	const ending: Map<number, number>[] = nums.map(() => new Map());
	let longest = 2;
	for (let j = 0; j < nums.length; j++) {
		for (let i = 0; i < j; i++) {
			const difference = (nums[j] ?? 0) - (nums[i] ?? 0);
			const length = (ending[i]?.get(difference) ?? 1) + 1;
			ending[j]?.set(difference, length);
			longest = Math.max(longest, length);
		}
	}
	return longest;
};
