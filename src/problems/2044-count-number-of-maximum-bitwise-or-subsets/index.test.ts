import { describe, expect, it } from "bun:test";
import { countNumberOfMaximumBitwiseOrSubsets as countMaxOrSubsets } from ".";

describe("2044. Count Number of Maximum Bitwise-OR Subsets", () => {
	it("solves the examples from the problem statement", () => {
		expect(countMaxOrSubsets([3, 1])).toBe(2);
		expect(countMaxOrSubsets([2, 2, 2])).toBe(7);
		expect(countMaxOrSubsets([3, 2, 1, 5])).toBe(6);
	});
});
