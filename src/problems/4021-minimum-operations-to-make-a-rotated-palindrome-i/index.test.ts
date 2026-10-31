import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeARotatedPalindromeI as minOperations } from ".";

describe("4021. Minimum Operations to Make a Rotated Palindrome I", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations("abc")).toBe(2);
		expect(minOperations("yb")).toBe(3);
	});

	it("needs nothing for a palindrome", () => {
		expect(minOperations("racecar")).toBe(0);
	});
});
