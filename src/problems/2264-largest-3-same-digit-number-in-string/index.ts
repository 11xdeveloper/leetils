/**
 * 2264. Largest 3-Same-Digit Number in String
 *
 * Returns the largest substring of three equal digits, or `""`.
 *
 * Try the digits from 9 down.
 *
 * @see https://leetcode.com/problems/largest-3-same-digit-number-in-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * largest3SameDigitNumberInString("6777133339"); // "777"
 */
export const largest3SameDigitNumberInString = (num: string): string => {
	for (let digit = 9; digit >= 0; digit--) {
		const triple = String(digit).repeat(3);
		if (num.includes(triple)) return triple;
	}
	return "";
};
