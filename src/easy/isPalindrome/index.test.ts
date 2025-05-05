import { describe, expect, it } from "bun:test";
import { isPalindrome } from "./index";

describe("isPalindrome", () => {
	it("should identify basic palindromes", () => {
		expect(isPalindrome(121)).toBe(true);
		expect(isPalindrome(12321)).toBe(true);
		expect(isPalindrome(123321)).toBe(true);
	});

	it("should handle negative numbers", () => {
		expect(isPalindrome(-121)).toBe(false);
		expect(isPalindrome(-12321)).toBe(false);
		expect(isPalindrome(-1)).toBe(false);
	});

	it("should handle single digit numbers", () => {
		expect(isPalindrome(0)).toBe(true);
		expect(isPalindrome(1)).toBe(true);
		expect(isPalindrome(9)).toBe(true);
	});

	it("should handle non-palindrome numbers", () => {
		expect(isPalindrome(10)).toBe(false);
		expect(isPalindrome(123)).toBe(false);
		expect(isPalindrome(1234)).toBe(false);
	});

	it("should handle numbers ending with zero", () => {
		expect(isPalindrome(10)).toBe(false);
		expect(isPalindrome(100)).toBe(false);
		expect(isPalindrome(1000)).toBe(false);
	});

	it("should handle large palindrome numbers", () => {
		expect(isPalindrome(123454321)).toBe(true);
		expect(isPalindrome(1234567654321)).toBe(true);
	});

	it("should handle edge cases", () => {
		expect(isPalindrome(0)).toBe(true);
		expect(isPalindrome(1)).toBe(true);
		expect(isPalindrome(11)).toBe(true);
		expect(isPalindrome(111)).toBe(true);
	});
});
