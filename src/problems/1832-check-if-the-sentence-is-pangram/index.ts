/**
 * 1832. Check if the Sentence Is Pangram
 *
 * Returns whether `sentence` uses every lowercase letter.
 *
 * Counts its distinct letters.
 *
 * @see https://leetcode.com/problems/check-if-the-sentence-is-pangram/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfTheSentenceIsPangram("thequickbrownfoxjumpsoverthelazydog"); // true
 */
export const checkIfTheSentenceIsPangram = (sentence: string): boolean =>
	new Set(sentence).size === 26;
