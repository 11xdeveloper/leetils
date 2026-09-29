/**
 * 290. Word Pattern
 *
 * Returns whether the space-separated words of `s` follow `pattern`: each
 * letter of the pattern stands for one word, consistently, and no two
 * letters stand for the same word.
 *
 * Checks the mapping both ways as it goes: each letter must always pair
 * with the same word, and each word with the same letter.
 *
 * @see https://leetcode.com/problems/word-pattern/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * wordPattern("abba", "dog cat cat dog"); // true
 * wordPattern("abba", "dog dog dog dog"); // false
 */
export const wordPattern = (pattern: string, s: string): boolean => {
	const words = s.split(" ");
	if (words.length !== pattern.length) return false;

	const wordFor = new Map<string, string>();
	const letterFor = new Map<string, string>();
	for (const [i, word] of words.entries()) {
		const letter = pattern.charAt(i);
		if (
			(wordFor.get(letter) ?? word) !== word ||
			(letterFor.get(word) ?? letter) !== letter
		)
			return false;
		wordFor.set(letter, word);
		letterFor.set(word, letter);
	}

	return true;
};
