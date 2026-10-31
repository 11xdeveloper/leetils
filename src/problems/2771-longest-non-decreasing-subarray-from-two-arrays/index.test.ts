import { describe, expect, it } from "bun:test";
import { longestNonDecreasingSubarrayFromTwoArrays as maxNonDecreasingLength } from ".";

describe("2771. Longest Non-decreasing Subarray From Two Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxNonDecreasingLength([2, 3, 1], [1, 2, 1])).toBe(2);
		expect(maxNonDecreasingLength([1, 3, 2, 1], [2, 2, 3, 4])).toBe(4);
		expect(maxNonDecreasingLength([1, 1], [2, 2])).toBe(2);
	});
});
