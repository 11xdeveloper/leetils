import { describe, expect, it } from "bun:test";
import { maximumValidSplitPositionsI as maxValidSplits } from ".";

describe("4035. Maximum Valid Split Positions I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxValidSplits([10, 30, 15, 10])).toBe(2);
		expect(maxValidSplits([2, 10, 14])).toBe(1);
		expect(maxValidSplits([2, 4])).toBe(0);
	});
});
