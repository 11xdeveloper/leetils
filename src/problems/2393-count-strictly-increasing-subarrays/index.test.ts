import { describe, expect, it } from "bun:test";
import { countStrictlyIncreasingSubarrays as countSubarrays } from ".";

describe("2393. Count Strictly Increasing Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubarrays([1, 3, 5, 4, 4, 6])).toBe(10);
		expect(countSubarrays([1, 2, 3, 4, 5])).toBe(15);
	});
});
