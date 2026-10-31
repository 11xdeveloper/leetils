import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeArrayEqualII as minOperations } from ".";

describe("2541. Minimum Operations to Make Array Equal II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([4, 3, 1, 4], [1, 3, 7, 1], 3)).toBe(2);
		expect(minOperations([3, 8, 5, 2], [2, 4, 1, 6], 1)).toBe(-1);
	});

	it("handles k = 0", () => {
		expect(minOperations([1, 2], [1, 2], 0)).toBe(0);
		expect(minOperations([1, 2], [2, 1], 0)).toBe(-1);
	});
});
