import { describe, expect, it } from "bun:test";
import { findSubsequenceOfLengthKWithTheLargestSum as maxSubsequence } from ".";

describe("2099. Find Subsequence of Length K With the Largest Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSubsequence([2, 1, 3, 3], 2)).toEqual([3, 3]);
		expect(maxSubsequence([-1, -2, 3, 4], 3)).toEqual([-1, 3, 4]);
		expect(maxSubsequence([3, 4, 3, 3], 2)).toEqual([3, 4]);
	});
});
