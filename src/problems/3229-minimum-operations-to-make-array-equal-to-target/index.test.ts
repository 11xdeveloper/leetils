import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeArrayEqualToTarget as minimumOperations } from ".";

describe("3229. Minimum Operations to Make Array Equal to Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumOperations([3, 5, 1, 2], [4, 6, 2, 4])).toBe(2);
		expect(minimumOperations([1, 3, 2], [2, 1, 4])).toBe(5);
	});

	it("handles sign changes", () => {
		expect(minimumOperations([0, 0, 0], [2, -2, 2])).toBe(6);
		expect(minimumOperations([5], [5])).toBe(0);
	});
});
