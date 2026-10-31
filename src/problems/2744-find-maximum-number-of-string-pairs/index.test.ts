import { describe, expect, it } from "bun:test";
import { findMaximumNumberOfStringPairs as maximumNumberOfStringPairs } from ".";

describe("2744. Find Maximum Number of String Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumNumberOfStringPairs(["cd", "ac", "dc", "ca", "zz"])).toBe(2);
		expect(maximumNumberOfStringPairs(["ab", "ba", "cc"])).toBe(1);
		expect(maximumNumberOfStringPairs(["aa", "ab"])).toBe(0);
	});
});
