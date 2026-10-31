import { describe, expect, it } from "bun:test";
import { longestStrictlyIncreasingOrStrictlyDecreasingSubarray as longestMonotonicSubarray } from ".";

describe("3105. Longest Strictly Increasing or Strictly Decreasing Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestMonotonicSubarray([1, 4, 3, 3, 2])).toBe(2);
		expect(longestMonotonicSubarray([3, 3, 3, 3])).toBe(1);
		expect(longestMonotonicSubarray([3, 2, 1])).toBe(3);
	});
});
