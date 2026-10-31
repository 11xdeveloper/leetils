/**
 * 2330. Valid Palindrome IV
 *
 * Returns whether `s` can become a palindrome by changing one or two
 * characters (exactly).
 *
 * Each mismatched mirror pair needs one change; extra changes can always
 * be spent harmlessly.
 *
 * @see https://leetcode.com/problems/valid-palindrome-iv/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * validPalindromeIV("abcdba"); // true
 */
export const validPalindromeIV = (s: string): boolean => {
	let mismatches = 0;
	for (let [i, j] = [0, s.length - 1]; i < j; i++, j--)
		if (s[i] !== s[j]) mismatches++;
	return mismatches <= 2;
};
