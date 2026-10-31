import { describe, expect, it } from "bun:test";
import { maximumSumOfDistinctSubarraysWithLengthK as maximumSubarraySum } from ".";

describe("2461. Maximum Sum of Distinct Subarrays With Length K", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSubarraySum([1, 5, 4, 2, 9, 9, 9], 3)).toBe(15);
		expect(maximumSubarraySum([4, 4, 4], 3)).toBe(0);
	});
});
