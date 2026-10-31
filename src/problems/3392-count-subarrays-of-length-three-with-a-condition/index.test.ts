import { describe, expect, it } from "bun:test";
import { countSubarraysOfLengthThreeWithACondition as countSubarrays } from ".";

describe("3392. Count Subarrays of Length Three With a Condition", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubarrays([1, 2, 1, 4, 1])).toBe(1);
		expect(countSubarrays([1, 1, 1])).toBe(0);
	});
});
