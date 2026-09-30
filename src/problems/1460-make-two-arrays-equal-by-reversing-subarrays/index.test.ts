import { describe, expect, it } from "bun:test";
import { makeTwoArraysEqualByReversingSubarrays as canBeEqual } from ".";

describe("1460. Make Two Arrays Equal by Reversing Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(canBeEqual([1, 2, 3, 4], [2, 4, 1, 3])).toBeTrue();
		expect(canBeEqual([7], [7])).toBeTrue();
		expect(canBeEqual([3, 7, 9], [3, 7, 11])).toBeFalse();
	});

	it("compares counts, not just the values present", () => {
		expect(canBeEqual([1, 1, 2], [1, 2, 2])).toBeFalse();
	});
});
