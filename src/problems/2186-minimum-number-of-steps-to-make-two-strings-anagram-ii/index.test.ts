import { describe, expect, it } from "bun:test";
import { minimumNumberOfStepsToMakeTwoStringsAnagramII as minSteps } from ".";

describe("2186. Minimum Number of Steps to Make Two Strings Anagram II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSteps("leetcode", "coats")).toBe(7);
		expect(minSteps("night", "thing")).toBe(0);
	});
});
