/**
 * 2942. Find Words Containing Character
 *
 * Returns the indices of the words containing `x`.
 *
 * Check each word.
 *
 * @see https://leetcode.com/problems/find-words-containing-character/
 * @difficulty Easy
 * @timeComplexity O(total length)
 * @spaceComplexity O(n)
 *
 * @example
 * findWordsContainingCharacter(["leet", "code"], "e"); // [0, 1]
 */
export const findWordsContainingCharacter = (
	words: readonly string[],
	x: string,
): number[] => words.flatMap((word, i) => (word.includes(x) ? [i] : []));
