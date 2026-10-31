import { describe, expect, it } from "bun:test";
import { findTheLongestBalancedSubstringOfABinaryString as findTheLongestBalancedSubstring } from ".";

describe("2609. Find the Longest Balanced Substring of a Binary String", () => {
	it("solves the examples from the problem statement", () => {
		expect(findTheLongestBalancedSubstring("01000111")).toBe(6);
		expect(findTheLongestBalancedSubstring("00111")).toBe(4);
		expect(findTheLongestBalancedSubstring("111")).toBe(0);
	});
});
