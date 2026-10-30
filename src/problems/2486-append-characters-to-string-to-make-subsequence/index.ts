/**
 * 2486. Append Characters to String to Make Subsequence
 *
 * Returns the fewest characters to append to `s` so `t` becomes a
 * subsequence of it.
 *
 * Match as much of `t` as possible greedily; append the rest.
 *
 * @see https://leetcode.com/problems/append-characters-to-string-to-make-subsequence/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * appendCharactersToStringToMakeSubsequence("coaching", "coding"); // 4
 */
export const appendCharactersToStringToMakeSubsequence = (
	s: string,
	t: string,
): number => {
	let matched = 0;
	for (const char of s) if (char === t[matched]) matched++;
	return t.length - matched;
};
