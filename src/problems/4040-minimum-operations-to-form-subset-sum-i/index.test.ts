import { describe, expect, it } from "bun:test";
import { minimumOperationsToFormSubsetSumI as minOperations } from ".";

describe("4040. Minimum Operations to Form Subset Sum I", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([5, 6, 10], 4)).toBe(3);
		expect(minOperations([10, 2], 13)).toBe(3);
		expect(minOperations([6, 3], 8)).toBe(-1);
	});
});
