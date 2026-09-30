/**
 * 966. Vowel Spellchecker
 *
 * For each query, returns the word from `wordlist` it matches: an exact
 * match first; else the first word equal ignoring case; else the first
 * word equal ignoring case and treating all vowels as interchangeable;
 * else `""`.
 *
 * Builds lookups for the exact words and for each word's lowercase and
 * vowel-masked forms, keeping the first word for each form.
 *
 * @see https://leetcode.com/problems/vowel-spellchecker/
 * @difficulty Medium
 * @timeComplexity O(total length of the words and queries)
 * @spaceComplexity O(total length of the words)
 *
 * @example
 * vowelSpellchecker(["KiTe", "kite", "hare", "Hare"], ["kite", "Kite", "KiTe", "Hare", "HARE", "Hear", "hear", "keti", "keet", "keto"]);
 * // ["kite", "KiTe", "KiTe", "Hare", "hare", "", "", "KiTe", "", "KiTe"]
 */
export const vowelSpellchecker = (
	wordlist: readonly string[],
	queries: readonly string[],
): string[] => {
	const exact = new Set(wordlist);
	const byCase = new Map<string, string>();
	const byVowel = new Map<string, string>();
	const mask = (word: string): string =>
		word.toLowerCase().replace(/[aeiou]/g, "*");
	for (const word of wordlist) {
		if (!byCase.has(word.toLowerCase())) byCase.set(word.toLowerCase(), word);
		if (!byVowel.has(mask(word))) byVowel.set(mask(word), word);
	}
	return queries.map((query) => {
		if (exact.has(query)) return query;
		return byCase.get(query.toLowerCase()) ?? byVowel.get(mask(query)) ?? "";
	});
};
