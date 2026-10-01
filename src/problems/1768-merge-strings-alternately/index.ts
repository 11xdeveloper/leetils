/**
 * 1768. Merge Strings Alternately
 *
 * Interleaves the characters of `word1` and `word2`, starting with
 * `word1`, and appends whatever remains of the longer one.
 *
 * One pass over the longer length.
 *
 * @see https://leetcode.com/problems/merge-strings-alternately/
 * @difficulty Easy
 * @timeComplexity O(m + n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * mergeStringsAlternately("ab", "pqrs"); // "apbqrs"
 */
export const mergeStringsAlternately = (
	word1: string,
	word2: string,
): string => {
	const merged: string[] = [];
	for (let i = 0; i < Math.max(word1.length, word2.length); i++)
		merged.push(word1[i] ?? "", word2[i] ?? "");
	return merged.join("");
};
