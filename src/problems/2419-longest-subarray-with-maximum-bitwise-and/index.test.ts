import { describe, expect, it } from "bun:test";
import { longestSubarrayWithMaximumBitwiseAnd as longestSubarray } from ".";

describe("2419. Longest Subarray With Maximum Bitwise AND", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubarray([1, 2, 3, 3, 2, 2])).toBe(2);
		expect(longestSubarray([1, 2, 3, 4])).toBe(1);
	});
});
