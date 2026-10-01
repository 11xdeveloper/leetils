/**
 * 1170. Compare Strings by Frequency of the Smallest Character
 *
 * `f(s)` counts how often the smallest letter of `s` appears. For each
 * query, returns how many words `w` have `f(query) < f(w)`.
 *
 * Words are at most 10 letters, so `f` is at most 10: counts the words at
 * each `f`, then takes suffix sums so each query is a lookup.
 *
 * @see https://leetcode.com/problems/compare-strings-by-frequency-of-the-smallest-character/
 * @difficulty Medium
 * @timeComplexity O(total length of queries and words)
 * @spaceComplexity O(q), for the result
 *
 * @example
 * compareStringsByFrequencyOfTheSmallestCharacter(["bbb", "cc"], ["a", "aa", "aaa", "aaaa"]); // [1, 2]
 */
export const compareStringsByFrequencyOfTheSmallestCharacter = (
	queries: readonly string[],
	words: readonly string[],
): number[] => {
	const f = (s: string) => {
		const smallest = [...s].reduce((min, char) => (char < min ? char : min));
		return [...s].filter((char) => char === smallest).length;
	};
	// above[k] counts the words with f(w) > k.
	const above = new Array<number>(12).fill(0);
	for (const word of words) {
		const frequency = f(word);
		above[frequency - 1] = (above[frequency - 1] ?? 0) + 1;
	}
	for (let k = 10; k >= 0; k--)
		above[k] = (above[k] ?? 0) + (above[k + 1] ?? 0);
	return queries.map((query) => above[f(query)] ?? 0);
};
