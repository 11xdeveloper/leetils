import { describe, expect, it } from "bun:test";
import { palindromeNumber } from ".";

describe("9. Palindrome Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(palindromeNumber(121)).toBe(true);
		expect(palindromeNumber(-121)).toBe(false);
		expect(palindromeNumber(10)).toBe(false);
	});

	it("handles odd and even numbers of digits", () => {
		expect(palindromeNumber(12321)).toBe(true);
		expect(palindromeNumber(123321)).toBe(true);
		expect(palindromeNumber(1231)).toBe(false);
		expect(palindromeNumber(123)).toBe(false);
	});

	it("treats single digits as palindromes", () => {
		for (let digit = 0; digit <= 9; digit++) {
			expect(palindromeNumber(digit)).toBe(true);
		}
	});

	it("rejects numbers ending in 0, except 0", () => {
		expect(palindromeNumber(100)).toBe(false);
		expect(palindromeNumber(1001)).toBe(true);
		expect(palindromeNumber(10010)).toBe(false);
	});

	it("rejects every negative number", () => {
		expect(palindromeNumber(-1)).toBe(false);
		expect(palindromeNumber(-2147483648)).toBe(false);
	});

	it("handles values at the 32-bit limit", () => {
		expect(palindromeNumber(2147483647)).toBe(false);
		expect(palindromeNumber(2147447412)).toBe(true);
	});

	it("agrees with reversing the digits as a string", () => {
		for (let x = 0; x <= 20000; x++) {
			const digits = String(x);
			expect(palindromeNumber(x)).toBe(
				digits === digits.split("").reverse().join(""),
			);
		}
	});
});
