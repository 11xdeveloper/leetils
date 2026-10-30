import { describe, expect, it } from "bun:test";
import { smallestSubarraysWithMaximumBitwiseOr as smallestSubarrays } from ".";

describe("2411. Smallest Subarrays With Maximum Bitwise OR", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestSubarrays([1, 0, 2, 1, 3])).toEqual([3, 3, 2, 2, 1]);
		expect(smallestSubarrays([1, 2])).toEqual([2, 1]);
	});
});
