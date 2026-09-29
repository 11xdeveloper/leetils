/**
 * 680. Valid Palindrome II
 *
 * Returns whether `s` can be a palindrome after deleting at most one
 * character.
 *
 * Two pointers from the ends. At the first mismatch, one of those two
 * characters must go, so it checks whether either remaining middle is a
 * palindrome.
 *
 * @see https://leetcode.com/problems/valid-palindrome-ii/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * validPalindromeII("abca"); // true: delete "c"
 */
export const validPalindromeII = (s: string): boolean => {
	const isPalindrome = (left: number, right: number): boolean => {
		for (; left < right; left++, right--)
			if (s.charAt(left) !== s.charAt(right)) return false;
		return true;
	};

	for (let left = 0, right = s.length - 1; left < right; left++, right--) {
		if (s.charAt(left) !== s.charAt(right))
			return isPalindrome(left + 1, right) || isPalindrome(left, right - 1);
	}
	return true;
};
