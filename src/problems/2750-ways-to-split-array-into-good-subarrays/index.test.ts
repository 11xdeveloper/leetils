import { describe, expect, it } from "bun:test";
import { waysToSplitArrayIntoGoodSubarrays as numberOfGoodSubarraySplits } from ".";

describe("2750. Ways to Split Array Into Good Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfGoodSubarraySplits([0, 1, 0, 0, 1])).toBe(3);
		expect(numberOfGoodSubarraySplits([0, 1, 0])).toBe(1);
	});

	it("returns 0 with no 1s", () => {
		expect(numberOfGoodSubarraySplits([0, 0])).toBe(0);
	});
});
