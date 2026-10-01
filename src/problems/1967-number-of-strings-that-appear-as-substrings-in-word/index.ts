/**
 * 1967. Number of Strings That Appear as Substrings in Word
 *
 * Counts the `patterns` that are substrings of `word`.
 *
 * A substring check per pattern.
 *
 * @see https://leetcode.com/problems/number-of-strings-that-appear-as-substrings-in-word/
 * @difficulty Easy
 * @timeComplexity O(p · |word| · |pattern|)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfStringsThatAppearAsSubstringsInWord(["a", "abc", "bc", "d"], "abc"); // 3
 */
export const numberOfStringsThatAppearAsSubstringsInWord = (
	patterns: readonly string[],
	word: string,
): number => patterns.filter((pattern) => word.includes(pattern)).length;
