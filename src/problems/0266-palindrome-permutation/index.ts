/**
 * 266. Palindrome Permutation
 *
 * Returns whether the letters of `s` can be rearranged into a palindrome.
 *
 * A palindrome pairs up every letter except possibly one in the middle, so
 * at most one letter can appear an odd number of times. A set tracks the
 * letters seen an odd number of times so far.
 *
 * @see https://leetcode.com/problems/palindrome-permutation/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1), at most 26 letters
 *
 * @example
 * palindromePermutation("carerac"); // true
 * palindromePermutation("code"); // false
 */
export const palindromePermutation = (s: string): boolean => {
	const odd = new Set<string>();
	for (const char of s) {
		if (odd.has(char)) odd.delete(char);
		else odd.add(char);
	}
	return odd.size <= 1;
};
