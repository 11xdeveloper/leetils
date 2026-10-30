import { describe, expect, it } from "bun:test";
import { largestElementInAnArrayAfterMergeOperations as maxArrayValue } from ".";

describe("2789. Largest Element in an Array after Merge Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxArrayValue([2, 3, 7, 9, 3])).toBe(21);
		expect(maxArrayValue([5, 3, 3])).toBe(11);
	});
});
