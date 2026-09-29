/**
 * 14. Longest Common Prefix
 *
 * Returns the longest string that every string in `strs` starts with, or
 * `""` if there is none.
 *
 * Compares the strings one column at a time and stops at the first column
 * where any string differs from the first or has run out.
 *
 * @see https://leetcode.com/problems/longest-common-prefix/
 * @difficulty Easy
 * @timeComplexity O(S) where S is the total number of characters
 * @spaceComplexity O(1)
 *
 * @example
 * longestCommonPrefix(["flower", "flow", "flight"]); // "fl"
 * longestCommonPrefix(["dog", "racecar", "car"]); // ""
 */
export const longestCommonPrefix = (strs: readonly string[]): string => {
	const [first = "", ...rest] = strs;

	for (let i = 0; i < first.length; i++) {
		const char = first[i];
		if (rest.some((str) => str[i] !== char)) return first.slice(0, i);
	}

	return first;
};
