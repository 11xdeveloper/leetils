import { describe, expect, it } from "bun:test";
import { maximumSubarrayWithEqualProducts as maxLength } from ".";

describe("3411. Maximum Subarray With Equal Products", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxLength([1, 2, 1, 2, 1, 1, 1])).toBe(5);
		expect(maxLength([2, 3, 4, 5, 6])).toBe(3);
		expect(maxLength([1, 2, 3, 1, 4, 5, 1])).toBe(5);
	});
});
