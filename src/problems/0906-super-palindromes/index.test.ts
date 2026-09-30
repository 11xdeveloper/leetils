import { describe, expect, it } from "bun:test";
import { superPalindromes as superpalindromesInRange } from ".";

describe("906. Super Palindromes", () => {
	it("solves the examples from the problem statement", () => {
		expect(superpalindromesInRange("4", "1000")).toBe(4);
		expect(superpalindromesInRange("1", "2")).toBe(1);
	});

	it("matches checking every square up to 10^8", () => {
		const isPalindrome = (text: string) =>
			text === [...text].reverse().join("");
		let expected = 0;
		for (let root = 1; root * root <= 10 ** 8; root++)
			if (isPalindrome(String(root)) && isPalindrome(String(root * root)))
				expected++;
		expect(superpalindromesInRange("1", String(10 ** 8))).toBe(expected);
	});

	it("handles the full range", () => {
		expect(superpalindromesInRange("1", "999999999999999999")).toBe(70);
	});
});
