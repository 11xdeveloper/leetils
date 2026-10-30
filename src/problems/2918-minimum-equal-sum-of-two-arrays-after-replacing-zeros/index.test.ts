import { describe, expect, it } from "bun:test";
import { minimumEqualSumOfTwoArraysAfterReplacingZeros as minSum } from ".";

describe("2918. Minimum Equal Sum of Two Arrays After Replacing Zeros", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSum([3, 2, 0, 1, 0], [6, 5, 0])).toBe(12);
		expect(minSum([2, 0, 2, 0], [1, 4])).toBe(-1);
	});
});
