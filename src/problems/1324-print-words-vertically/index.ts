/**
 * 1324. Print Words Vertically
 *
 * Writes the words of `s` down the page, one per column, and returns the
 * rows, with spaces where a word is too short and no trailing spaces.
 *
 * Row `r` takes the `r`th letter of each word, or a space, then drops
 * trailing spaces.
 *
 * @see https://leetcode.com/problems/print-words-vertically/
 * @difficulty Medium
 * @timeComplexity O(w · L) for w words up to L long
 * @spaceComplexity O(w · L)
 *
 * @example
 * printWordsVertically("TO BE OR NOT TO BE"); // ["TBONTB", "OEROOE", "   T"]
 */
export const printWordsVertically = (s: string): string[] => {
	const words = s.split(" ");
	const height = Math.max(...words.map((word) => word.length));
	return Array.from({ length: height }, (_, r) =>
		words
			.map((word) => word[r] ?? " ")
			.join("")
			.trimEnd(),
	);
};
