/**
 * 459. Repeated Substring Pattern
 *
 * Returns whether `s` is some shorter string repeated two or more times.
 *
 * `s` is such a repetition exactly when it equals a non-trivial rotation of
 * itself, so it appears in `s + s` with the first and last characters
 * removed, which rules out the two trivial matches.
 *
 * @see https://leetcode.com/problems/repeated-substring-pattern/
 * @difficulty Easy
 * @timeComplexity O(n) on average for the substring search
 * @spaceComplexity O(n)
 *
 * @example
 * repeatedSubstringPattern("abcabcabcabc"); // true
 */
export const repeatedSubstringPattern = (s: string): boolean =>
	(s + s).slice(1, -1).includes(s);
