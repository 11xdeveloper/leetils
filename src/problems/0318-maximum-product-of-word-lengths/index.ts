/**
 * 318. Maximum Product of Word Lengths
 *
 * Returns the largest `words[i].length * words[j].length` for two words
 * that share no letters, or 0 if every pair shares one.
 *
 * Turns each word into a 26-bit mask of the letters it uses, keeping only
 * the longest word for each mask. Two words share no letters exactly when
 * their masks AND to 0, which is a single operation per pair.
 *
 * @see https://leetcode.com/problems/maximum-product-of-word-lengths/
 * @difficulty Medium
 * @timeComplexity O(n^2 + L) where L is the total length of the words
 * @spaceComplexity O(n)
 *
 * @example
 * maximumProductOfWordLengths(["abcw", "baz", "foo", "bar", "xtfn", "abcdef"]); // 16: "abcw" and "xtfn"
 */
export const maximumProductOfWordLengths = (
	words: readonly string[],
): number => {
	const longest = new Map<number, number>();
	for (const word of words) {
		let mask = 0;
		for (let i = 0; i < word.length; i++)
			mask |= 1 << (word.charCodeAt(i) - 97);
		longest.set(mask, Math.max(longest.get(mask) ?? 0, word.length));
	}

	const entries = [...longest];
	let best = 0;
	for (const [i, [maskA, lengthA]] of entries.entries()) {
		for (const [maskB, lengthB] of entries.slice(i + 1)) {
			if ((maskA & maskB) === 0) best = Math.max(best, lengthA * lengthB);
		}
	}
	return best;
};
