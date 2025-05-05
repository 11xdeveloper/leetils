import { describe, expect, it } from "bun:test";
import { romanToInt } from "./index";

describe("romanToInt", () => {
	it("should convert basic roman numerals", () => {
		expect(romanToInt("III")).toBe(3);
		expect(romanToInt("IV")).toBe(4);
		expect(romanToInt("IX")).toBe(9);
		expect(romanToInt("LVIII")).toBe(58);
	});

	it("should handle subtractive combinations", () => {
		expect(romanToInt("IV")).toBe(4); // 5-1
		expect(romanToInt("IX")).toBe(9); // 10-1
		expect(romanToInt("XL")).toBe(40); // 50-10
		expect(romanToInt("XC")).toBe(90); // 100-10
		expect(romanToInt("CD")).toBe(400); // 500-100
		expect(romanToInt("CM")).toBe(900); // 1000-100
	});

	it("should handle complex numbers", () => {
		expect(romanToInt("MCMXCIV")).toBe(1994); // 1000 + (1000-100) + (100-10) + (5-1)
		expect(romanToInt("MMCDXLVIII")).toBe(2448); // 2000 + (500-100) + (50-10) + 8
	});

	it("should handle repeated numerals", () => {
		expect(romanToInt("II")).toBe(2);
		expect(romanToInt("XX")).toBe(20);
		expect(romanToInt("CC")).toBe(200);
		expect(romanToInt("MMM")).toBe(3000);
	});

	it("should handle invalid inputs", () => {
		expect(romanToInt("")).toBe(0);
		expect(romanToInt("ABC")).toBe(0);
	});

	it("should handle large valid numbers", () => {
		expect(romanToInt("MMMCMXCIX")).toBe(3999); // Largest valid roman numeral
		expect(romanToInt("MDCLXVI")).toBe(1666); // All symbols in descending order
	});
});
