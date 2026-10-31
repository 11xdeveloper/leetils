import { describe, expect, it } from "bun:test";
import { longestBalancedSubarrayI as longestBalanced } from ".";

describe("3719. Longest Balanced Subarray I", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestBalanced([2, 5, 4, 3])).toBe(4);
		expect(longestBalanced([3, 2, 2, 5, 4])).toBe(5);
		expect(longestBalanced([1, 2, 3, 2])).toBe(3);
	});
});
