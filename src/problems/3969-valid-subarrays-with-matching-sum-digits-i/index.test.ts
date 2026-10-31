import { describe, expect, it } from "bun:test";
import { validSubarraysWithMatchingSumDigitsI as countValidSubarrays } from ".";

describe("3969. Valid Subarrays With Matching Sum Digits I", () => {
	it("solves the examples from the problem statement", () => {
		expect(countValidSubarrays([1, 100, 1], 1)).toBe(4);
		expect(countValidSubarrays([1], 2)).toBe(0);
	});
});
