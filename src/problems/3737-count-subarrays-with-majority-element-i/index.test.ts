import { describe, expect, it } from "bun:test";
import { countSubarraysWithMajorityElementI as countMajoritySubarrays } from ".";

describe("3737. Count Subarrays With Majority Element I", () => {
	it("solves the examples from the problem statement", () => {
		expect(countMajoritySubarrays([1, 2, 2, 3], 2)).toBe(5);
		expect(countMajoritySubarrays([1, 1, 1, 1], 1)).toBe(10);
		expect(countMajoritySubarrays([1, 2, 3], 4)).toBe(0);
	});
});
