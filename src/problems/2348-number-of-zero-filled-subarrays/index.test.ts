import { describe, expect, it } from "bun:test";
import { numberOfZeroFilledSubarrays as zeroFilledSubarray } from ".";

describe("2348. Number of Zero-Filled Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(zeroFilledSubarray([1, 3, 0, 0, 2, 0, 0, 4])).toBe(6);
		expect(zeroFilledSubarray([0, 0, 0, 2, 0, 0])).toBe(9);
		expect(zeroFilledSubarray([2, 10, 2019])).toBe(0);
	});
});
