import { describe, expect, it } from "bun:test";
import { sumOfVariableLengthSubarrays as subarraySum } from ".";

describe("3427. Sum of Variable Length Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(subarraySum([2, 3, 1])).toBe(11);
		expect(subarraySum([3, 1, 1, 2])).toBe(13);
	});
});
