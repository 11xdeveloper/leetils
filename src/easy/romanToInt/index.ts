import { type RomanNumeral, RomanNumerals } from "../../lib/constants";

/**
 * Converts a Roman numeral string to an integer.
 * Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
 *
 * Symbol       Value
 * I             1
 * V             5
 * X             10
 * L             50
 * C             100
 * D             500
 * M             1000
 *
 * For example, 2 is written as II in Roman numeral, just two ones added together.
 * 12 is written as XII, which is simply X + II.
 * The number 27 is written as XXVII, which is XX + V + II.
 *
 * Roman numerals are usually written largest to smallest from left to right.
 * However, the numeral for four is not IIII. Instead, the number four is written as IV.
 * Because the one is before the five we subtract it making four.
 * The same principle applies to the number nine, which is written as IX.
 *
 * @param roman - The Roman numeral string to convert
 * @returns The integer value of the Roman numeral, or 0 if invalid characters are present
 *
 * @example
 * Input: s = "III"
 * Output: 3
 * Explanation: III = 3
 *
 * @example
 * Input: s = "LVIII"
 * Output: 58
 * Explanation: L = 50, V= 5, III = 3
 *
 * @example
 * Input: s = "MCMXCIV"
 * Output: 1994
 * Explanation: M = 1000, CM = 900, XC = 90 and IV = 4
 *
 * @timeComplexity O(n) - where n is the length of the input string
 * @spaceComplexity O(1) - constant space for storing the result
 */
export const romanToInt = (roman: string): number => {
	if (
		roman.split("").some((char) => !Object.keys(RomanNumerals).includes(char))
	)
		return 0;

	let result = 0;

	for (let i = 0; i < roman.length; i++) {
		const val = RomanNumerals[roman[i] as RomanNumeral];
		const next = RomanNumerals[roman[i + 1] as RomanNumeral] ?? 0;

		result = val >= next ? result + val : result - val;
	}

	return result;
};
