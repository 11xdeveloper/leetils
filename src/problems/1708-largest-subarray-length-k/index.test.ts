import { describe, expect, it } from "bun:test";
import { largestSubarrayLengthK as largestSubarray } from ".";

describe("1708. Largest Subarray Length K", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestSubarray([1, 4, 5, 2, 3], 3)).toEqual([5, 2, 3]);
		expect(largestSubarray([1, 4, 5, 2, 3], 4)).toEqual([4, 5, 2, 3]);
		expect(largestSubarray([1, 4, 5, 2, 3], 1)).toEqual([5]);
	});
});
