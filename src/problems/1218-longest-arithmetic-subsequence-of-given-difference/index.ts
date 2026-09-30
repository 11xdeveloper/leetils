/**
 * 1218. Longest Arithmetic Subsequence of Given Difference
 *
 * Returns the length of the longest subsequence of `arr` whose neighbouring
 * elements differ by `difference`.
 *
 * Dynamic programming keyed by value: the longest such subsequence ending
 * in `x` extends the longest ending in `x − difference` seen so far.
 *
 * @see https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestArithmeticSubsequenceOfGivenDifference([1, 5, 7, 8, 5, 3, 4, 2, 1], -2); // 4
 */
export const longestArithmeticSubsequenceOfGivenDifference = (
	arr: readonly number[],
	difference: number,
): number => {
	const longestEnding = new Map<number, number>();
	let longest = 0;
	for (const value of arr) {
		const length = (longestEnding.get(value - difference) ?? 0) + 1;
		longestEnding.set(value, length);
		longest = Math.max(longest, length);
	}
	return longest;
};
