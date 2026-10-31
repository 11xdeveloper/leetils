import { describe, expect, it } from "bun:test";
import { frequencyBalanceSubarray as getLength } from ".";

describe("3960. Frequency Balance Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(getLength([1, 2, 2, 1, 2, 3, 3, 3])).toBe(5);
		expect(getLength([5, 5, 5, 5])).toBe(4);
		expect(getLength([1, 2, 3, 4])).toBe(1);
	});
});
