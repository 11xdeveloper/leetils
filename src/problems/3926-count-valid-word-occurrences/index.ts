/**
 * 3926. Count Valid Word Occurrences
 *
 * Join `chunks` into one string. A word is a maximal run of letters and
 * joiner hyphens (hyphens with letters on both sides); everything else
 * separates words. For each query, counts its occurrences as a word.
 *
 * @see https://leetcode.com/problems/count-valid-word-occurrences/
 * @difficulty Medium
 * @timeComplexity O(L + Q)
 * @spaceComplexity O(L)
 *
 * @example
 * countValidWordOccurrences(["a-b a--b ", "a-", "b"], ["a-b", "a", "b"]); // [2, 1, 1]
 */
export const countValidWordOccurrences = (
	chunks: readonly string[],
	queries: readonly string[],
): number[] => {
	const s = chunks.join("");
	const isLetter = (c: string | undefined) =>
		c !== undefined && c >= "a" && c <= "z";
	const counts = new Map<string, number>();
	let word = "";
	for (let i = 0; i <= s.length; i++) {
		const c = s[i];
		if (isLetter(c) || (c === "-" && isLetter(s[i - 1]) && isLetter(s[i + 1])))
			word += c;
		else {
			if (word) counts.set(word, (counts.get(word) ?? 0) + 1);
			word = "";
		}
	}
	return queries.map((query) => counts.get(query) ?? 0);
};
