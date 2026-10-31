import { describe, expect, it } from "bun:test";
import { maximumTotalSubarrayValueI as maxTotalValue } from ".";

describe("3689. Maximum Total Subarray Value I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxTotalValue([1, 3, 2], 2)).toBe(4);
		expect(maxTotalValue([4, 2, 5, 1], 3)).toBe(12);
	});
});
