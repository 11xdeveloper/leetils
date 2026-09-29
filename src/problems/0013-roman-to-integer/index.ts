const SYMBOL_VALUES: Readonly<Record<string, number>> = {
	I: 1,
	V: 5,
	X: 10,
	L: 50,
	C: 100,
	D: 500,
	M: 1000,
};

/**
 * 13. Roman to Integer
 *
 * Converts a valid Roman numeral in the range [1, 3999] to an integer.
 *
 * Adds each symbol's value, except when a smaller value comes before a larger
 * one (as in IV or CM), in which case it is subtracted.
 *
 * @see https://leetcode.com/problems/roman-to-integer/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * romanToInteger("LVIII"); // 58
 * romanToInteger("MCMXCIV"); // 1994
 */
export const romanToInteger = (s: string): number => {
	let result = 0;

	for (let i = 0; i < s.length; i++) {
		const value = SYMBOL_VALUES[s.charAt(i)] ?? 0;
		const next = SYMBOL_VALUES[s.charAt(i + 1)] ?? 0;
		result += value < next ? -value : value;
	}

	return result;
};
