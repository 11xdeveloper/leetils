/**
 * 422. Valid Word Square
 *
 * Returns whether `words` forms a word square: for every `k`, the `k`th row
 * reads the same as the `k`th column. Rows can have different lengths.
 *
 * Checks that every letter `words[r][c]` has the same letter at
 * `words[c][r]`, which also catches rows and columns of different lengths.
 *
 * @see https://leetcode.com/problems/valid-word-square/
 * @difficulty Easy
 * @timeComplexity O(total number of letters)
 * @spaceComplexity O(1)
 *
 * @example
 * validWordSquare(["abcd", "bnrt", "crm", "dt"]); // true
 */
export const validWordSquare = (words: readonly string[]): boolean =>
	words.every((word, r) =>
		[...word].every((letter, c) => words[c]?.[r] === letter),
	) &&
	words.every(
		(word, r) =>
			word.length === words.filter((other) => other.length > r).length,
	);
