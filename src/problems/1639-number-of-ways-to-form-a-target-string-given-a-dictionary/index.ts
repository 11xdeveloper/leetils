const MOD = 1_000_000_007;

/**
 * 1639. Number of Ways to Form a Target String Given a Dictionary
 *
 * Builds `target` left to right, taking each character from column `k` of
 * any word in `words` (all the same length), where each pick's column must
 * be after the previous one. Counts the ways, modulo 10^9 + 7.
 *
 * Only how many words have each letter in each column matters. `ways[i]`
 * counts the ways to build the first `i` target characters from the
 * columns seen so far; each column can extend any prefix by one character,
 * updated from the longest prefix down so a column is used once.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-form-a-target-string-given-a-dictionary/
 * @difficulty Hard
 * @timeComplexity O(w · L + L · t) for word length L and target length t
 * @spaceComplexity O(26 · L + t)
 *
 * @example
 * numberOfWaysToFormATargetStringGivenADictionary(["acca", "bbbb", "caca"], "aba"); // 6
 */
export const numberOfWaysToFormATargetStringGivenADictionary = (
	words: readonly string[],
	target: string,
): number => {
	const length = words[0]?.length ?? 0;
	const counts = Array.from({ length }, () => new Array<number>(26).fill(0));
	for (const word of words) {
		for (let k = 0; k < length; k++) {
			const column = counts[k];
			const letter = word.charCodeAt(k) - 97;
			if (column) column[letter] = (column[letter] ?? 0) + 1;
		}
	}
	const ways = new Array<number>(target.length + 1).fill(0);
	ways[0] = 1;
	for (const column of counts) {
		for (let i = target.length; i >= 1; i--) {
			const choices = column[target.charCodeAt(i - 1) - 97] ?? 0;
			ways[i] = ((ways[i] ?? 0) + (ways[i - 1] ?? 0) * choices) % MOD;
		}
	}
	return ways[target.length] ?? 0;
};
