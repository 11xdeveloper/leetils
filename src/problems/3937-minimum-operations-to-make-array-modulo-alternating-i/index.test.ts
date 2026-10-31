import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeArrayModuloAlternatingI as minOperations } from ".";

describe("3937. Minimum Operations to Make Array Modulo Alternating I", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([1, 4, 2, 8], 3)).toBe(2);
		expect(minOperations([1, 1, 1], 3)).toBe(1);
	});

	it("handles a single element", () => {
		expect(minOperations([5], 2)).toBe(0);
	});
});
