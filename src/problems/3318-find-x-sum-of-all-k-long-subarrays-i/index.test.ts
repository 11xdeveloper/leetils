import { describe, expect, it } from "bun:test";
import { findXSumOfAllKLongSubarraysI as findXSum } from ".";

describe("3318. Find X-Sum of All K-Long Subarrays I", () => {
	it("solves the examples from the problem statement", () => {
		expect(findXSum([1, 1, 2, 2, 3, 4, 2, 3], 6, 2)).toEqual([6, 10, 12]);
		expect(findXSum([3, 8, 7, 8, 7, 5], 2, 2)).toEqual([11, 15, 15, 15, 12]);
	});
});
