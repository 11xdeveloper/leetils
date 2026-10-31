import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeMedianOfArrayEqualToK as minOperations } from ".";

describe("3107. Minimum Operations to Make Median of Array Equal to K", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([2, 5, 6, 8, 5], 4)).toBe(2);
		expect(minOperations([2, 5, 6, 8, 5], 7)).toBe(3);
		expect(minOperations([1, 2, 3, 4, 5, 6], 4)).toBe(0);
	});
});
