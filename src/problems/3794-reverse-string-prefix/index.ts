/**
 * 3794. Reverse String Prefix
 *
 * Reverses the first `k` characters of `s`.
 *
 * @see https://leetcode.com/problems/reverse-string-prefix/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reverseStringPrefix("abcd", 2); // "bacd"
 */
export const reverseStringPrefix = (s: string, k: number): string =>
	[...s.slice(0, k)].reverse().join("") + s.slice(k);
