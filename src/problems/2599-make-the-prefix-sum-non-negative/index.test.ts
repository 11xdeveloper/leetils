import { describe, expect, it } from "bun:test";
import { makeThePrefixSumNonNegative as makePrefSumNonNegative } from ".";

describe("2599. Make the Prefix Sum Non-negative", () => {
	it("solves the examples from the problem statement", () => {
		expect(makePrefSumNonNegative([2, 3, -5, 4])).toBe(0);
		expect(makePrefSumNonNegative([3, -5, -2, 6])).toBe(1);
	});
});
