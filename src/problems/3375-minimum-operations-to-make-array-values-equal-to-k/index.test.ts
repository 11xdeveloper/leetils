import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeArrayValuesEqualToK as minOperations } from ".";

describe("3375. Minimum Operations to Make Array Values Equal to K", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([5, 2, 5, 4, 5], 2)).toBe(2);
		expect(minOperations([2, 1, 2], 2)).toBe(-1);
		expect(minOperations([9, 7, 5, 3], 1)).toBe(4);
	});
});
