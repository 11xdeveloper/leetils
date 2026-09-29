const INT_MAX = 2 ** 31 - 1;
const INT_MIN = -(2 ** 31);

/**
 * 7. Reverse Integer
 *
 * Reverses the digits of a 32-bit signed integer, keeping its sign. Returns 0
 * if the result doesn't fit in 32 bits.
 *
 * Pops digits off the end of `x` and pushes them onto the result. The
 * problem assumes 64-bit integers aren't available, so overflow is detected
 * before multiplying rather than after.
 *
 * @see https://leetcode.com/problems/reverse-integer/
 * @difficulty Medium
 * @timeComplexity O(log x)
 * @spaceComplexity O(1)
 *
 * @example
 * reverseInteger(-123); // -321
 * reverseInteger(120); // 21
 * reverseInteger(1534236469); // 0, since 9646324351 doesn't fit in 32 bits
 */
export const reverseInteger = (x: number): number => {
	const maxBeforeLastDigit = Math.trunc(INT_MAX / 10);
	const minBeforeLastDigit = Math.trunc(INT_MIN / 10);
	let rest = x;
	let reversed = 0;

	while (rest !== 0) {
		// `%` and `Math.trunc` keep the sign, so negative numbers work too.
		const digit = rest % 10;
		rest = Math.trunc(rest / 10);

		if (
			reversed > maxBeforeLastDigit ||
			(reversed === maxBeforeLastDigit && digit > INT_MAX % 10) ||
			reversed < minBeforeLastDigit ||
			(reversed === minBeforeLastDigit && digit < INT_MIN % 10)
		) {
			return 0;
		}

		reversed = reversed * 10 + digit;
	}

	return reversed;
};
