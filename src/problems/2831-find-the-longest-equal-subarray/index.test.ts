import { describe, expect, it } from "bun:test";
import { findTheLongestEqualSubarray as longestEqualSubarray } from ".";

describe("2831. Find the Longest Equal Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestEqualSubarray([1, 3, 2, 3, 1, 3], 3)).toBe(3);
		expect(longestEqualSubarray([1, 1, 2, 2, 1, 1], 2)).toBe(4);
	});
});
