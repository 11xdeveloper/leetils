const NUMERALS: readonly (readonly [value: number, symbol: string])[] = [
	[1000, "M"],
	[900, "CM"],
	[500, "D"],
	[400, "CD"],
	[100, "C"],
	[90, "XC"],
	[50, "L"],
	[40, "XL"],
	[10, "X"],
	[9, "IX"],
	[5, "V"],
	[4, "IV"],
	[1, "I"],
];

/**
 * 12. Integer to Roman
 *
 * Converts an integer in the range [1, 3999] to a Roman numeral.
 *
 * Greedily takes the largest value that still fits, with the six subtractive
 * forms (CM, CD, XC, XL, IX, IV) treated as symbols of their own.
 *
 * @see https://leetcode.com/problems/integer-to-roman/
 * @difficulty Medium
 * @timeComplexity O(1), since the numeral has at most 15 symbols
 * @spaceComplexity O(1)
 *
 * @example
 * integerToRoman(58); // "LVIII"
 * integerToRoman(1994); // "MCMXCIV"
 */
export const integerToRoman = (num: number): string => {
	let rest = num;
	let roman = "";

	for (const [value, symbol] of NUMERALS) {
		while (rest >= value) {
			roman += symbol;
			rest -= value;
		}
	}

	return roman;
};
