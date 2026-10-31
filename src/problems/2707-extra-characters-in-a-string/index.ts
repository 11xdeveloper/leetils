/**
 * 2707. Extra Characters in a String
 *
 * Splits `s` into dictionary words with some characters left over.
 * Returns the fewest leftover characters.
 *
 * Dynamic programming over prefixes: the last character is either left
 * over or ends a dictionary word.
 *
 * @see https://leetcode.com/problems/extra-characters-in-a-string/
 * @difficulty Medium
 * @timeComplexity O(n² · L), where `L` is the longest word
 * @spaceComplexity O(n + dictionary size)
 *
 * @example
 * extraCharactersInAString("sayhelloworld", ["hello", "world"]); // 3
 */
export const extraCharactersInAString = (
	s: string,
	dictionary: readonly string[],
): number => {
	const words = new Set(dictionary);
	const extra = [0];
	for (let end = 1; end <= s.length; end++) {
		let best = (extra[end - 1] ?? 0) + 1;
		for (let start = 0; start < end; start++)
			if (words.has(s.slice(start, end)))
				best = Math.min(best, extra[start] ?? 0);
		extra.push(best);
	}
	return extra[s.length] ?? 0;
};
