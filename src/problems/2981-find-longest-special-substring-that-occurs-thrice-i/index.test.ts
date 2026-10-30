import { describe, expect, it } from "bun:test";
import { findLongestSpecialSubstringThatOccursThriceI as maximumLength } from ".";

describe("2981. Find Longest Special Substring That Occurs Thrice I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumLength("aaaa")).toBe(2);
		expect(maximumLength("abcdef")).toBe(-1);
		expect(maximumLength("abcaba")).toBe(1);
	});
});
