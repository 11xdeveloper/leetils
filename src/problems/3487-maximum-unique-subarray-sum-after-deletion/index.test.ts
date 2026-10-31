import { describe, expect, it } from "bun:test";
import { maximumUniqueSubarraySumAfterDeletion as maxSum } from ".";

describe("3487. Maximum Unique Subarray Sum After Deletion", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSum([1, 2, 3, 4, 5])).toBe(15);
		expect(maxSum([1, 1, 0, 1, 1])).toBe(1);
		expect(maxSum([1, 2, -1, -2, 1, 0, -1])).toBe(3);
		expect(maxSum([-3, -1])).toBe(-1);
	});
});
