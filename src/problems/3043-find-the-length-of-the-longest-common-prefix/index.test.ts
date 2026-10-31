import { describe, expect, it } from "bun:test";
import { findTheLengthOfTheLongestCommonPrefix as longestCommonPrefix } from ".";

describe("3043. Find the Length of the Longest Common Prefix", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestCommonPrefix([1, 10, 100], [1000])).toBe(3);
		expect(longestCommonPrefix([1, 2, 3], [4, 4, 4])).toBe(0);
	});
});
