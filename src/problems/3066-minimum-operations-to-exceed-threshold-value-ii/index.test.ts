import { describe, expect, it } from "bun:test";
import { minimumOperationsToExceedThresholdValueII as minOperations } from ".";

describe("3066. Minimum Operations to Exceed Threshold Value II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([2, 11, 10, 1, 3], 10)).toBe(2);
		expect(minOperations([1, 1, 2, 4, 9], 20)).toBe(4);
	});

	it("handles large values", () => {
		expect(minOperations([1e9, 999999999, 1], 1e9)).toBe(1);
	});
});
