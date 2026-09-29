import { describe, expect, it } from "bun:test";
import { romanToInteger } from ".";

describe("13. Roman to Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(romanToInteger("III")).toBe(3);
		expect(romanToInteger("LVIII")).toBe(58);
		expect(romanToInteger("MCMXCIV")).toBe(1994);
	});

	it("converts every symbol on its own", () => {
		expect(romanToInteger("I")).toBe(1);
		expect(romanToInteger("V")).toBe(5);
		expect(romanToInteger("X")).toBe(10);
		expect(romanToInteger("L")).toBe(50);
		expect(romanToInteger("C")).toBe(100);
		expect(romanToInteger("D")).toBe(500);
		expect(romanToInteger("M")).toBe(1000);
	});

	it("subtracts in each of the six subtractive pairs", () => {
		expect(romanToInteger("IV")).toBe(4);
		expect(romanToInteger("IX")).toBe(9);
		expect(romanToInteger("XL")).toBe(40);
		expect(romanToInteger("XC")).toBe(90);
		expect(romanToInteger("CD")).toBe(400);
		expect(romanToInteger("CM")).toBe(900);
	});

	it("converts numbers across the whole range", () => {
		expect(romanToInteger("MMCDXLVIII")).toBe(2448);
		expect(romanToInteger("MDCLXVI")).toBe(1666);
		expect(romanToInteger("MMMCMXCIX")).toBe(3999);
	});
});
