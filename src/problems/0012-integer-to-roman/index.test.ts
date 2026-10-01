import { describe, expect, it } from "bun:test";
import { romanToInteger } from "../0013-roman-to-integer";
import { integerToRoman } from ".";

describe("12. Integer to Roman", () => {
	it("solves the examples from the problem statement", () => {
		expect(integerToRoman(3749)).toBe("MMMDCCXLIX");
		expect(integerToRoman(58)).toBe("LVIII");
		expect(integerToRoman(1994)).toBe("MCMXCIV");
	});

	it("uses the subtractive forms", () => {
		expect(integerToRoman(4)).toBe("IV");
		expect(integerToRoman(9)).toBe("IX");
		expect(integerToRoman(40)).toBe("XL");
		expect(integerToRoman(90)).toBe("XC");
		expect(integerToRoman(400)).toBe("CD");
		expect(integerToRoman(900)).toBe("CM");
	});

	it("handles both ends of the range", () => {
		expect(integerToRoman(1)).toBe("I");
		expect(integerToRoman(3999)).toBe("MMMCMXCIX");
	});

	it("round-trips with Roman to Integer for every number in range", () => {
		for (let num = 1; num <= 3999; num++) {
			const roman = integerToRoman(num);
			expect(romanToInteger(roman)).toBe(num);
			// Canonical numerals never repeat a symbol four times.
			expect(roman).not.toMatch(/(.)\1\1\1/);
		}
	});
});
