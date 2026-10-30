/**
 * 2559. Count Vowel Strings in Ranges
 *
 * For each query `[l, r]`, returns how many of `words[l..r]` start and
 * end with a vowel.
 *
 * Prefix counts of such words answer each query by subtraction.
 *
 * @see https://leetcode.com/problems/count-vowel-strings-in-ranges/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * countVowelStringsInRanges(["aba", "bcb", "ece", "aa", "e"], [[0, 2], [1, 4], [1, 1]]); // [2, 3, 0]
 */
export const countVowelStringsInRanges = (
	words: readonly string[],
	queries: readonly (readonly number[])[],
): number[] => {
	const vowels = new Set("aeiou");
	const prefix = [0];
	for (const word of words)
		prefix.push(
			(prefix.at(-1) ?? 0) +
				(vowels.has(word.charAt(0)) && vowels.has(word.charAt(word.length - 1))
					? 1
					: 0),
		);
	return queries.map(
		([l = 0, r = 0]) => (prefix[r + 1] ?? 0) - (prefix[l] ?? 0),
	);
};
