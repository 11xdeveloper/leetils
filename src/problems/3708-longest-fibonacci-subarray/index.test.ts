import { describe, expect, it } from "bun:test";
import { longestFibonacciSubarray as longestSubarray } from ".";

describe("3708. Longest Fibonacci Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubarray([1, 1, 1, 1, 2, 3, 5, 1])).toBe(5);
		expect(longestSubarray([5, 2, 7, 9, 16])).toBe(5);
		expect(longestSubarray([1000000000, 1000000000, 1000000000])).toBe(2);
	});
});
