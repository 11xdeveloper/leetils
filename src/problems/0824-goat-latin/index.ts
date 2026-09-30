/**
 * 824. Goat Latin
 *
 * Converts a sentence to Goat Latin: a word starting with a vowel gets
 * `"ma"` appended; otherwise its first letter moves to the end, then
 * `"ma"`. The `i`th word (from 1) also gets `i` letters `"a"`.
 *
 * Transforms each word in turn.
 *
 * @see https://leetcode.com/problems/goat-latin/
 * @difficulty Easy
 * @timeComplexity O(n^2) for the growing suffixes
 * @spaceComplexity O(n^2)
 *
 * @example
 * goatLatin("I speak Goat Latin"); // "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"
 */
export const goatLatin = (sentence: string): string =>
	sentence
		.split(" ")
		.map((word, i) => {
			const base = /^[aeiou]/i.test(word)
				? word
				: word.slice(1) + word.charAt(0);
			return `${base}ma${"a".repeat(i + 1)}`;
		})
		.join(" ");
