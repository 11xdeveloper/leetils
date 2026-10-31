import { describe, expect, it } from "bun:test";
import { longestSubarrayWithAtMostKDistinctPrimeFactors as longestSubarray } from ".";

describe("4032. Longest Subarray With at Most K Distinct Prime Factors", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubarray([7, 6, 10, 12, 11], 3)).toBe(3);
		expect(longestSubarray([4, 6, 9, 18], 4)).toBe(4);
		expect(longestSubarray([6, 10, 15], 2)).toBe(1);
	});

	it("returns 0 when no element fits", () => {
		expect(longestSubarray([30, 30], 2)).toBe(0);
	});
});
