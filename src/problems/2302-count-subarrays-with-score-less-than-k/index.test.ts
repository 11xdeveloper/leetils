import { describe, expect, it } from "bun:test";
import { countSubarraysWithScoreLessThanK as countSubarrays } from ".";

describe("2302. Count Subarrays With Score Less Than K", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubarrays([2, 1, 4, 3, 5], 10)).toBe(6);
		expect(countSubarrays([1, 1, 1], 5)).toBe(5);
	});
});
