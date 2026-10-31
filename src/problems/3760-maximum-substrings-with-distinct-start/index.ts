/**
 * 3760. Maximum Substrings With Distinct Start
 *
 * Split `s` into substrings that all start with different letters.
 * Returns the most substrings possible.
 *
 * Start a new piece at the first occurrence of each letter, which gives
 * one piece per distinct letter, and no more is possible.
 *
 * @see https://leetcode.com/problems/maximum-substrings-with-distinct-start/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumSubstringsWithDistinctStart("abab"); // 2
 */
export const maximumSubstringsWithDistinctStart = (s: string): number =>
	new Set(s).size;
