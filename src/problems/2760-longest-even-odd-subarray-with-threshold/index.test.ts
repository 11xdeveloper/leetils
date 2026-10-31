import { describe, expect, it } from "bun:test";
import { longestEvenOddSubarrayWithThreshold as longestAlternatingSubarray } from ".";

describe("2760. Longest Even Odd Subarray With Threshold", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestAlternatingSubarray([3, 2, 5, 4], 5)).toBe(3);
		expect(longestAlternatingSubarray([1, 2], 2)).toBe(1);
		expect(longestAlternatingSubarray([2, 3, 4, 5], 4)).toBe(3);
	});
});
