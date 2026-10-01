/**
 * 1071. Greatest Common Divisor of Strings
 *
 * A string `t` divides `s` if `s` is `t` repeated. Returns the longest
 * string dividing both `str1` and `str2`, or `""` if there's none.
 *
 * A common divisor exists exactly when `str1 + str2 === str2 + str1`, and
 * then the longest is the prefix whose length is the gcd of their lengths.
 *
 * @see https://leetcode.com/problems/greatest-common-divisor-of-strings/
 * @difficulty Easy
 * @timeComplexity O(m + n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * greatestCommonDivisorOfStrings("ABABAB", "ABAB"); // "AB"
 */
export const greatestCommonDivisorOfStrings = (
	str1: string,
	str2: string,
): string => {
	if (str1 + str2 !== str2 + str1) return "";
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	return str1.slice(0, gcd(str1.length, str2.length));
};
