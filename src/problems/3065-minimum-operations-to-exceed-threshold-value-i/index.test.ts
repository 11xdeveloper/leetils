import { describe, expect, it } from "bun:test";
import { minimumOperationsToExceedThresholdValueI as minOperations } from ".";

describe("3065. Minimum Operations to Exceed Threshold Value I", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([2, 11, 10, 1, 3], 10)).toBe(3);
		expect(minOperations([1, 1, 2, 4, 9], 1)).toBe(0);
		expect(minOperations([1, 1, 2, 4, 9], 9)).toBe(4);
	});
});
