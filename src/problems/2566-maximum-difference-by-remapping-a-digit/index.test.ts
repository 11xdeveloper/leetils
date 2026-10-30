import { describe, expect, it } from "bun:test";
import { maximumDifferenceByRemappingADigit as minMaxDifference } from ".";

describe("2566. Maximum Difference by Remapping a Digit", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMaxDifference(11891)).toBe(99009);
		expect(minMaxDifference(90)).toBe(99);
	});

	it("handles all nines", () => {
		expect(minMaxDifference(999)).toBe(999);
	});
});
