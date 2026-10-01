/**
 * 1930. Unique Length-3 Palindromic Subsequences
 *
 * Counts the distinct palindromes of length 3 that are subsequences of
 * `s`.
 *
 * For each outer letter, use its first and last occurrences; every
 * distinct letter strictly between them gives one palindrome.
 *
 * @see https://leetcode.com/problems/unique-length-3-palindromic-subsequences/
 * @difficulty Medium
 * @timeComplexity O(26 · n)
 * @spaceComplexity O(1)
 *
 * @example
 * uniqueLength3PalindromicSubsequences("bbcbaba"); // 4
 */
export const uniqueLength3PalindromicSubsequences = (s: string): number => {
	let count = 0;
	for (const letter of new Set(s)) {
		const [first, last] = [s.indexOf(letter), s.lastIndexOf(letter)];
		if (last - first > 1) count += new Set(s.slice(first + 1, last)).size;
	}
	return count;
};
