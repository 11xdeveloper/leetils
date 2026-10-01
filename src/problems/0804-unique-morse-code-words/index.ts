/**
 * 804. Unique Morse Code Words
 *
 * Returns how many different Morse code transformations the `words` have,
 * where a word's transformation concatenates the codes of its letters.
 *
 * Builds each transformation and counts the distinct ones with a set.
 *
 * @see https://leetcode.com/problems/unique-morse-code-words/
 * @difficulty Easy
 * @timeComplexity O(total length of the words)
 * @spaceComplexity O(total length of the words)
 *
 * @example
 * uniqueMorseCodeWords(["gin", "zen", "gig", "msg"]); // 2
 */
export const uniqueMorseCodeWords = (words: readonly string[]): number => {
	const codes = [
		".-",
		"-...",
		"-.-.",
		"-..",
		".",
		"..-.",
		"--.",
		"....",
		"..",
		".---",
		"-.-",
		".-..",
		"--",
		"-.",
		"---",
		".--.",
		"--.-",
		".-.",
		"...",
		"-",
		"..-",
		"...-",
		".--",
		"-..-",
		"-.--",
		"--..",
	];
	return new Set(
		words.map((word) =>
			[...word].map((letter) => codes[letter.charCodeAt(0) - 97]).join(""),
		),
	).size;
};
