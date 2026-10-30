/**
 * 2299. Strong Password Checker II
 *
 * A strong password has at least 8 characters, a lowercase letter, an
 * uppercase letter, a digit, a special character from `!@#$%^&*()-+`,
 * and no two equal adjacent characters.
 *
 * Check each rule.
 *
 * @see https://leetcode.com/problems/strong-password-checker-ii/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * strongPasswordCheckerII("IloveLe3tcode!"); // true
 */
export const strongPasswordCheckerII = (password: string): boolean =>
	password.length >= 8 &&
	/[a-z]/.test(password) &&
	/[A-Z]/.test(password) &&
	/\d/.test(password) &&
	/[!@#$%^&*()\-+]/.test(password) &&
	!/(.)\1/.test(password);
