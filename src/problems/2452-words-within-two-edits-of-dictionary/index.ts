/**
 * 2452. Words Within Two Edits of Dictionary
 *
 * Returns, in order, the queries that differ from some dictionary word
 * (same length) in at most two positions.
 *
 * @see https://leetcode.com/problems/words-within-two-edits-of-dictionary/
 * @difficulty Medium
 * @timeComplexity O(q · d · n)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * wordsWithinTwoEditsOfDictionary(["word", "note", "ants", "wood"], ["wood", "joke", "moat"]); // ["word", "note", "wood"]
 */
export const wordsWithinTwoEditsOfDictionary = (
	queries: readonly string[],
	dictionary: readonly string[],
): string[] =>
	queries.filter((query) =>
		dictionary.some((word) => {
			let edits = 0;
			for (let i = 0; i < query.length && edits <= 2; i++)
				if (query[i] !== word[i]) edits++;
			return edits <= 2;
		}),
	);
