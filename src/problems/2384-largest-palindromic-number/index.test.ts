import { describe, expect, it } from "bun:test";
import { largestPalindromicNumber as largestPalindromic } from ".";

describe("2384. Largest Palindromic Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestPalindromic("444947137")).toBe("7449447");
		expect(largestPalindromic("00009")).toBe("9");
	});

	it("avoids leading zeros", () => {
		expect(largestPalindromic("0000")).toBe("0");
		expect(largestPalindromic("00011")).toBe("10001");
	});
});
