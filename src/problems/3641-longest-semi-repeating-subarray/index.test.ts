import { describe, expect, it } from "bun:test";
import { longestSemiRepeatingSubarray as longestSubarray } from ".";

describe("3641. Longest Semi-Repeating Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubarray([1, 2, 3, 1, 2, 3, 4], 2)).toBe(6);
		expect(longestSubarray([1, 1, 1, 1, 1], 4)).toBe(5);
		expect(longestSubarray([1, 1, 1, 1, 1], 0)).toBe(1);
	});
});
