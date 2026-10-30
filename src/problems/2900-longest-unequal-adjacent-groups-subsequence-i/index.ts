/**
 * 2900. Longest Unequal Adjacent Groups Subsequence I
 *
 * Each word has a binary group. Returns a longest subsequence of words
 * whose neighbouring groups differ.
 *
 * Take the first word and then every word whose group differs from the
 * previous word's: each run of equal groups contributes one word.
 *
 * @see https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestUnequalAdjacentGroupsSubsequenceI(["a", "b", "c", "d"], [1, 0, 1, 1]); // ["a", "b", "c"]
 */
export const longestUnequalAdjacentGroupsSubsequenceI = (
	words: readonly string[],
	groups: readonly number[],
): string[] => words.filter((_, i) => i === 0 || groups[i] !== groups[i - 1]);
