const isAlphanumeric = (char: string): boolean => /^[a-z0-9]$/i.test(char);

/**
 * 125. Valid Palindrome
 *
 * Returns whether `s` reads the same forwards and backwards once it's
 * lowercased and everything except letters and digits is removed.
 *
 * Two pointers move in from both ends, skipping other characters and
 * comparing letters case-insensitively, without building a cleaned-up copy.
 *
 * @see https://leetcode.com/problems/valid-palindrome/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * validPalindrome("A man, a plan, a canal: Panama"); // true
 */
export const validPalindrome = (s: string): boolean => {
	let left = 0;
	let right = s.length - 1;

	while (left < right) {
		if (!isAlphanumeric(s.charAt(left))) left++;
		else if (!isAlphanumeric(s.charAt(right))) right--;
		else if (s.charAt(left).toLowerCase() !== s.charAt(right).toLowerCase())
			return false;
		else {
			left++;
			right--;
		}
	}

	return true;
};
