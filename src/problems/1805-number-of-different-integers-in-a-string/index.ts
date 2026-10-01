/**
 * 1805. Number of Different Integers in a String
 *
 * Replacing every letter of `word` with a space, counts the distinct
 * integers left (ignoring leading zeros).
 *
 * Collects the digit runs as strings with leading zeros removed, since the
 * numbers can be too long for numeric types.
 *
 * @see https://leetcode.com/problems/number-of-different-integers-in-a-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfDifferentIntegersInAString("a123bc34d8ef34"); // 3
 */
export const numberOfDifferentIntegersInAString = (word: string): number =>
	new Set(
		(word.match(/\d+/g) ?? []).map((digits) => digits.replace(/^0+(?=\d)/, "")),
	).size;
