import { describe, expect, it } from "bun:test";
import { maximumSumOfAlmostUniqueSubarray as maxSum } from ".";

describe("2841. Maximum Sum of Almost Unique Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSum([2, 6, 7, 3, 1, 7], 3, 4)).toBe(18);
		expect(maxSum([5, 9, 9, 2, 4, 5, 4], 1, 3)).toBe(23);
		expect(maxSum([1, 2, 1, 2, 1, 2, 1], 3, 3)).toBe(0);
	});
});
