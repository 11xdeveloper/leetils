import { describe, expect, it } from "bun:test";
import { countAlternatingSubarrays } from ".";

describe("3101. Count Alternating Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(countAlternatingSubarrays([0, 1, 1, 1])).toBe(5);
		expect(countAlternatingSubarrays([1, 0, 1, 0])).toBe(10);
	});
});
