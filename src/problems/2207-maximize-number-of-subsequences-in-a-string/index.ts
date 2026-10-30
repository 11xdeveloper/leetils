/**
 * 2207. Maximize Number of Subsequences in a String
 *
 * Inserts one character of the two-letter `pattern` anywhere in `text`.
 * Returns the most occurrences of `pattern` as a subsequence.
 *
 * Inserting `pattern[0]` at the start adds one occurrence per
 * `pattern[1]`; inserting `pattern[1]` at the end adds one per
 * `pattern[0]`. Add the larger to the existing count.
 *
 * @see https://leetcode.com/problems/maximize-number-of-subsequences-in-a-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximizeNumberOfSubsequencesInAString("abdcdbc", "ac"); // 4
 */
export const maximizeNumberOfSubsequencesInAString = (
	text: string,
	pattern: string,
): number => {
	const [first, second] = [pattern[0], pattern[1]];
	let [firsts, seconds, existing] = [0, 0, 0];
	for (const char of text) {
		if (char === second) {
			existing += firsts;
			seconds++;
		}
		if (char === first) firsts++;
	}
	return existing + Math.max(firsts, seconds);
};
