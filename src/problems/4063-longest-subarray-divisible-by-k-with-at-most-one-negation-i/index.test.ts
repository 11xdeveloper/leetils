import { describe, expect, it } from "bun:test";
import { longestSubarrayDivisibleByKWithAtMostOneNegationI as longestSubarray } from ".";

describe("4063. Longest Subarray Divisible by K with At Most One Negation I", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubarray([4, 1, 2], 3)).toBe(3);
		expect(longestSubarray([5, 3, 4], 7)).toBe(2);
		expect(longestSubarray([2, 2, 5], 6)).toBe(2);
	});
});
