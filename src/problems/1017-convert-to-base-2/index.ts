/**
 * 1017. Convert to Base -2
 *
 * Returns `n` written in base -2 (digits 0 and 1, place values
 * 1, -2, 4, -8, …), without leading zeros.
 *
 * Repeatedly takes the lowest digit, `n mod 2` (made non-negative), then
 * divides what's left by -2.
 *
 * @see https://leetcode.com/problems/convert-to-base-2/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * convertToBase2(3); // "111": 4 - 2 + 1
 */
export const convertToBase2 = (n: number): string => {
	if (n === 0) return "0";
	let digits = "";
	while (n !== 0) {
		const digit = Math.abs(n % 2);
		digits = digit + digits;
		n = (n - digit) / -2;
	}
	return digits;
};
