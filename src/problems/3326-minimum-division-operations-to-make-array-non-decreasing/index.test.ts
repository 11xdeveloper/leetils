import { describe, expect, it } from "bun:test";
import { minimumDivisionOperationsToMakeArrayNonDecreasing as minOperations } from ".";

describe("3326. Minimum Division Operations to Make Array Non Decreasing", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([25, 7])).toBe(1);
		expect(minOperations([7, 7, 6])).toBe(-1);
		expect(minOperations([1, 1, 1, 1])).toBe(0);
	});

	it("handles ones, which can't be divided", () => {
		expect(minOperations([2, 1])).toBe(-1);
		expect(minOperations([12, 3, 9])).toBe(1);
	});
});
