import { describe, expect, it } from "bun:test";
import { splitArrayIntoMaximumNumberOfSubarrays as maxSubarrays } from ".";

describe("2871. Split Array Into Maximum Number of Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSubarrays([1, 0, 2, 0, 1, 2])).toBe(3);
		expect(maxSubarrays([5, 7, 1, 3])).toBe(1);
	});
});
