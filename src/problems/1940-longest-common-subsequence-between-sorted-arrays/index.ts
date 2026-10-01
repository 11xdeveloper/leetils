/**
 * 1940. Longest Common Subsequence Between Sorted Arrays
 *
 * Every array is strictly increasing. Returns their longest common
 * subsequence.
 *
 * Strictly increasing arrays share exactly the values in all of them, in
 * increasing order; count how many arrays contain each value (at most
 * 100).
 *
 * @see https://leetcode.com/problems/longest-common-subsequence-between-sorted-arrays/
 * @difficulty Medium
 * @timeComplexity O(total length + 100)
 * @spaceComplexity O(100)
 *
 * @example
 * longestCommonSubsequenceBetweenSortedArrays([[2, 3, 6, 8], [1, 2, 3, 5, 6, 7, 10], [2, 3, 4, 6, 9]]); // [2, 3, 6]
 */
export const longestCommonSubsequenceBetweenSortedArrays = (
	arrays: readonly (readonly number[])[],
): number[] => {
	const counts = new Array<number>(101).fill(0);
	for (const array of arrays)
		for (const value of array) counts[value] = (counts[value] ?? 0) + 1;
	return counts.flatMap((count, value) =>
		count === arrays.length ? [value] : [],
	);
};
