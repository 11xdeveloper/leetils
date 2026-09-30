/**
 * 1160. Find Words That Can Be Formed by Characters
 *
 * A word is good if it can be spelled with the letters of `chars`, each used
 * at most once. Returns the total length of the good words.
 *
 * Counts the letters in `chars`, then checks each word's letter counts
 * against them.
 *
 * @see https://leetcode.com/problems/find-words-that-can-be-formed-by-characters/
 * @difficulty Easy
 * @timeComplexity O(c + total length of words)
 * @spaceComplexity O(1), 26 letters
 *
 * @example
 * findWordsThatCanBeFormedByCharacters(["cat", "bt", "hat", "tree"], "atach"); // 6
 */
export const findWordsThatCanBeFormedByCharacters = (
	words: readonly string[],
	chars: string,
): number => {
	const count = (s: string) => {
		const counts = new Array<number>(26).fill(0);
		for (let i = 0; i < s.length; i++) {
			const letter = s.charCodeAt(i) - 97;
			counts[letter] = (counts[letter] ?? 0) + 1;
		}
		return counts;
	};
	const available = count(chars);
	let total = 0;
	for (const word of words) {
		const needed = count(word);
		if (needed.every((n, letter) => n <= (available[letter] ?? 0))) {
			total += word.length;
		}
	}
	return total;
};
