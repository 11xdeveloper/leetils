const HEX = "0123456789abcdef";

/**
 * 405. Convert a Number to Hexadecimal
 *
 * Writes a 32-bit integer in lowercase hexadecimal, using two's complement
 * for negative numbers, without leading zeros (except for 0 itself) and
 * without a built-in conversion.
 *
 * Takes the lowest 4 bits at a time as a hex digit, shifting right without
 * sign extension (`>>>`) so a negative number's two's complement bits come
 * out after at most 8 digits.
 *
 * @see https://leetcode.com/problems/convert-a-number-to-hexadecimal/
 * @difficulty Easy
 * @timeComplexity O(1), at most 8 digits
 * @spaceComplexity O(1)
 *
 * @example
 * convertANumberToHexadecimal(26); // "1a"
 * convertANumberToHexadecimal(-1); // "ffffffff"
 */
export const convertANumberToHexadecimal = (num: number): string => {
	if (num === 0) return "0";

	let hex = "";
	for (let rest = num >>> 0; rest !== 0; rest >>>= 4)
		hex = HEX.charAt(rest & 0xf) + hex;
	return hex;
};
