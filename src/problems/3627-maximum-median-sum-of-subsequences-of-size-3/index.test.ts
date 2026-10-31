import { describe, expect, it } from "bun:test";
import { maximumMedianSumOfSubsequencesOfSize3 as maximumMedianSum } from ".";

describe("3627. Maximum Median Sum of Subsequences of Size 3", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumMedianSum([2, 1, 3, 2, 1, 3])).toBe(5);
		expect(maximumMedianSum([1, 1, 10, 10, 10, 10])).toBe(20);
	});
});
