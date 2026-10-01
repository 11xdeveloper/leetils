/**
 * 1328. Break a Palindrome
 *
 * Changes exactly one letter of `palindrome` so it's no longer a
 * palindrome, making it as small as possible, or returns `""` if that
 * can't be done.
 *
 * Changing the first letter in the first half that isn't `a` into an `a` is
 * best. If the first half is all `a`s, the only other option is to make the
 * last letter a `b`. (The middle of an odd-length string doesn't count: it
 * stays a palindrome whatever it's changed to.)
 *
 * @see https://leetcode.com/problems/break-a-palindrome/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * breakAPalindrome("abccba"); // "aaccba"
 */
export const breakAPalindrome = (palindrome: string): string => {
	const n = palindrome.length;
	if (n === 1) return "";
	for (let i = 0; i < Math.floor(n / 2); i++) {
		if (palindrome[i] !== "a")
			return `${palindrome.slice(0, i)}a${palindrome.slice(i + 1)}`;
	}
	return `${palindrome.slice(0, -1)}b`;
};
