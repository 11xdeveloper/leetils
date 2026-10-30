import { describe, expect, it } from "bun:test";
import { lengthOfTheLongestAlphabeticalContinuousSubstring as longestContinuousSubstring } from ".";

describe("2414. Length of the Longest Alphabetical Continuous Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestContinuousSubstring("abacaba")).toBe(2);
		expect(longestContinuousSubstring("abcde")).toBe(5);
	});
});
