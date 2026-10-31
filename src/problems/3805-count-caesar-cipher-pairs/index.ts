/**
 * 3805. Count Caesar Cipher Pairs
 *
 * Two words are similar if shifting every letter of one of them forwards
 * cyclically, some number of times, makes them equal. Counts the similar
 * pairs.
 *
 * Shift each word so it starts with "a"; similar words then match
 * exactly.
 *
 * @see https://leetcode.com/problems/count-caesar-cipher-pairs/
 * @difficulty Medium
 * @timeComplexity O(n · m)
 * @spaceComplexity O(n · m)
 *
 * @example
 * countCaesarCipherPairs(["ab", "aa", "za", "aa"]); // 2
 */
export const countCaesarCipherPairs = (words: readonly string[]): number => {
	const counts = new Map<string, number>();
	let pairs = 0;
	for (const word of words) {
		const shift = word.charCodeAt(0) - 97;
		let key = "";
		for (let i = 0; i < word.length; i++)
			key += String.fromCharCode(
				97 + ((word.charCodeAt(i) - 97 - shift + 26) % 26),
			);
		const seen = counts.get(key) ?? 0;
		pairs += seen;
		counts.set(key, seen + 1);
	}
	return pairs;
};
