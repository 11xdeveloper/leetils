/**
 * 2531. Make Number of Distinct Characters Equal
 *
 * Returns whether swapping exactly one character of `word1` with one of
 * `word2` can leave both words with the same number of distinct letters.
 *
 * Only the letters swapped matter, so try every pair of letters present
 * in each word and update the letter counts.
 *
 * @see https://leetcode.com/problems/make-number-of-distinct-characters-equal/
 * @difficulty Medium
 * @timeComplexity O(n + 26³)
 * @spaceComplexity O(1)
 *
 * @example
 * makeNumberOfDistinctCharactersEqual("abcc", "aab"); // true
 */
export const makeNumberOfDistinctCharactersEqual = (
	word1: string,
	word2: string,
): boolean => {
	const countLetters = (word: string): number[] => {
		const counts = Array.from({ length: 26 }, () => 0);
		for (let i = 0; i < word.length; i++)
			counts[word.charCodeAt(i) - 97] =
				(counts[word.charCodeAt(i) - 97] ?? 0) + 1;
		return counts;
	};
	const counts1 = countLetters(word1);
	const counts2 = countLetters(word2);
	const distinct = (counts: number[]): number =>
		counts.filter((c) => c > 0).length;

	for (let a = 0; a < 26; a++) {
		if (!counts1[a]) continue;
		for (let b = 0; b < 26; b++) {
			if (!counts2[b]) continue;
			const after1 = [...counts1];
			const after2 = [...counts2];
			after1[a] = (after1[a] ?? 0) - 1;
			after1[b] = (after1[b] ?? 0) + 1;
			after2[b] = (after2[b] ?? 0) - 1;
			after2[a] = (after2[a] ?? 0) + 1;
			if (distinct(after1) === distinct(after2)) return true;
		}
	}
	return false;
};
