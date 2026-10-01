/**
 * 953. Verifying an Alien Dictionary
 *
 * Returns whether `words` are sorted lexicographically under the alien
 * alphabet `order` (a permutation of the English letters).
 *
 * Translates each word into ranks of its letters and checks each
 * neighbouring pair, where a word sorts before any longer word it prefixes.
 *
 * @see https://leetcode.com/problems/verifying-an-alien-dictionary/
 * @difficulty Easy
 * @timeComplexity O(total length)
 * @spaceComplexity O(1), 26 ranks
 *
 * @example
 * verifyingAnAlienDictionary(["hello", "leetcode"], "hlabcdefgijkmnopqrstuvwxyz"); // true
 */
export const verifyingAnAlienDictionary = (
	words: readonly string[],
	order: string,
): boolean => {
	const rank = new Map([...order].map((letter, i) => [letter, i]));
	const inOrder = (a: string, b: string): boolean => {
		for (let i = 0; i < Math.min(a.length, b.length); i++) {
			const [x, y] = [rank.get(a.charAt(i)) ?? 0, rank.get(b.charAt(i)) ?? 0];
			if (x !== y) return x < y;
		}
		return a.length <= b.length;
	};
	return words.every((word, i) => i === 0 || inOrder(words[i - 1] ?? "", word));
};
