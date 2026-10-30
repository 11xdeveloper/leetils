/**
 * 2255. Count Prefixes of a Given String
 *
 * Counts the words that are prefixes of `s`.
 *
 * @see https://leetcode.com/problems/count-prefixes-of-a-given-string/
 * @difficulty Easy
 * @timeComplexity O(total length)
 * @spaceComplexity O(1)
 *
 * @example
 * countPrefixesOfAGivenString(["a", "b", "c", "ab", "bc", "abc"], "abc"); // 3
 */
export const countPrefixesOfAGivenString = (
	words: readonly string[],
	s: string,
): number => words.filter((word) => s.startsWith(word)).length;
