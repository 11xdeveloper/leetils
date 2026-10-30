import { describe, expect, it } from "bun:test";
import { longestNiceSubarray } from ".";

describe("2401. Longest Nice Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestNiceSubarray([1, 3, 8, 48, 10])).toBe(3);
		expect(longestNiceSubarray([3, 1, 5, 11, 13])).toBe(1);
	});
});
