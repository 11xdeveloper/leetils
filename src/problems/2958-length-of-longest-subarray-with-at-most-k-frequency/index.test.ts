import { describe, expect, it } from "bun:test";
import { lengthOfLongestSubarrayWithAtMostKFrequency as maxSubarrayLength } from ".";

describe("2958. Length of Longest Subarray With at Most K Frequency", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSubarrayLength([1, 2, 3, 1, 2, 3, 1, 2], 2)).toBe(6);
		expect(maxSubarrayLength([1, 2, 1, 2, 1, 2, 1, 2], 1)).toBe(2);
		expect(maxSubarrayLength([5, 5, 5, 5, 5, 5, 5], 4)).toBe(4);
	});
});
