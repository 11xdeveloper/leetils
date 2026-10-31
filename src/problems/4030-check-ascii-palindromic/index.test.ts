import { describe, expect, it } from "bun:test";
import { checkAsciiPalindromic as isPalindromic } from ".";

describe("4030. Check ASCII Palindromic", () => {
	it("solves the examples from the problem statement", () => {
		expect(isPalindromic("ff")).toBeTrue();
		expect(isPalindromic("leet")).toBeFalse();
	});
});
