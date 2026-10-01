/**
 * 1616. Split Two Strings to Make Palindrome
 *
 * Splitting `a` and `b` at the same index, returns whether `a`'s prefix plus
 * `b`'s suffix, or `b`'s prefix plus `a`'s suffix, is a palindrome.
 *
 * Match `a` from the front against `b` from the back for as long as they
 * agree; the split can then go anywhere in the unmatched middle, which must
 * be a palindrome in `a` or in `b`. Try both orders.
 *
 * @see https://leetcode.com/problems/split-two-strings-to-make-palindrome/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * splitTwoStringsToMakePalindrome("ulacfd", "jizalu"); // true
 */
export const splitTwoStringsToMakePalindrome = (
	a: string,
	b: string,
): boolean => {
	const isPalindrome = (s: string, i: number, j: number) => {
		for (; i < j; i++, j--) if (s[i] !== s[j]) return false;
		return true;
	};
	const works = (front: string, back: string) => {
		let [i, j] = [0, front.length - 1];
		while (i < j && front[i] === back[j]) {
			i++;
			j--;
		}
		return isPalindrome(front, i, j) || isPalindrome(back, i, j);
	};
	return works(a, b) || works(b, a);
};
