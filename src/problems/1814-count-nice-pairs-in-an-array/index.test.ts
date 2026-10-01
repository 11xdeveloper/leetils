import { describe, expect, it } from "bun:test";
import { countNicePairsInAnArray as countNicePairs } from ".";

describe("1814. Count Nice Pairs in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(countNicePairs([42, 11, 1, 97])).toBe(2);
		expect(countNicePairs([13, 10, 35, 24, 76])).toBe(4);
	});

	it("reduces large counts modulo 10^9 + 7", () => {
		expect(countNicePairs(new Array(100000).fill(7))).toBe(
			4999950000 % 1_000_000_007,
		);
	});
});
