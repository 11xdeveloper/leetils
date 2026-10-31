import { describe, expect, it } from "bun:test";
import { findMaximumBalancedXorSubarrayLength as maxBalancedSubarray } from ".";

describe("3755. Find Maximum Balanced XOR Subarray Length", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxBalancedSubarray([3, 1, 3, 2, 0])).toBe(4);
		expect(maxBalancedSubarray([3, 2, 8, 5, 4, 14, 9, 15])).toBe(8);
		expect(maxBalancedSubarray([0])).toBe(0);
	});
});
