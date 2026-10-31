import { describe, expect, it } from "bun:test";
import { maximizeNumberOfSubsequencesInAString as maximumSubsequenceCount } from ".";

describe("2207. Maximize Number of Subsequences in a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSubsequenceCount("abdcdbc", "ac")).toBe(4);
		expect(maximumSubsequenceCount("aabb", "ab")).toBe(6);
	});

	it("handles a pattern of one repeated letter", () => {
		expect(maximumSubsequenceCount("aaa", "aa")).toBe(6);
		expect(maximumSubsequenceCount("xyz", "aa")).toBe(0);
	});
});
