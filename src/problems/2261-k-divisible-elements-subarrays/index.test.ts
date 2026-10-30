import { describe, expect, it } from "bun:test";
import { kDivisibleElementsSubarrays as countDistinct } from ".";

describe("2261. K Divisible Elements Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(countDistinct([2, 3, 3, 2, 2], 2, 2)).toBe(11);
		expect(countDistinct([1, 2, 3, 4], 4, 1)).toBe(10);
	});

	it("keeps multi-digit values apart", () => {
		expect(countDistinct([1, 11, 1], 3, 100)).toBe(5);
	});
});
