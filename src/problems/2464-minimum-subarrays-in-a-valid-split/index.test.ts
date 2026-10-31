import { describe, expect, it } from "bun:test";
import { minimumSubarraysInAValidSplit as validSubarraySplit } from ".";

describe("2464. Minimum Subarrays in a Valid Split", () => {
	it("solves the examples from the problem statement", () => {
		expect(validSubarraySplit([2, 6, 3, 4, 3])).toBe(2);
		expect(validSubarraySplit([3, 5])).toBe(2);
		expect(validSubarraySplit([1, 2, 1])).toBe(-1);
	});
});
