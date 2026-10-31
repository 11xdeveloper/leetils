import { describe, expect, it } from "bun:test";
import { countOfInterestingSubarrays as countInterestingSubarrays } from ".";

describe("2845. Count of Interesting Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(countInterestingSubarrays([3, 2, 4], 2, 1)).toBe(3);
		expect(countInterestingSubarrays([3, 1, 9, 6], 3, 0)).toBe(2);
	});
});
