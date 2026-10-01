/**
 * 1271. Hexspeak
 *
 * Writes the decimal number `num` in upper-case hexadecimal with `0` as `O`
 * and `1` as `I`. Returns that if it only uses the letters `ABCDEFIO`, and
 * `"ERROR"` otherwise.
 *
 * Converts and checks the digits. Values up to 10^12 are exact as
 * JavaScript numbers.
 *
 * @see https://leetcode.com/problems/hexspeak/
 * @difficulty Easy
 * @timeComplexity O(log num)
 * @spaceComplexity O(log num)
 *
 * @example
 * hexspeak("257"); // "IOI"
 */
export const hexspeak = (num: string): string => {
	const hex = Number(num)
		.toString(16)
		.toUpperCase()
		.replaceAll("0", "O")
		.replaceAll("1", "I");
	return /^[A-FIO]+$/.test(hex) ? hex : "ERROR";
};
