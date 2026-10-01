/**
 * 1374. Generate a String With Characters That Have Odd Counts
 *
 * Returns a string of `n` lowercase letters in which every letter appears
 * an odd number of times.
 *
 * `n` copies of `a` if `n` is odd; otherwise `n − 1` copies and one `b`.
 *
 * @see https://leetcode.com/problems/generate-a-string-with-characters-that-have-odd-counts/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n), for the result
 *
 * @example
 * generateAStringWithCharactersThatHaveOddCounts(4); // "aaab"
 */
export const generateAStringWithCharactersThatHaveOddCounts = (
	n: number,
): string => (n % 2 === 1 ? "a".repeat(n) : `${"a".repeat(n - 1)}b`);
