import { describe, expect, it } from "bun:test";
import { minimumIncrementOperationsToMakeArrayBeautiful as minIncrementOperations } from ".";

describe("2919. Minimum Increment Operations to Make Array Beautiful", () => {
	it("solves the examples from the problem statement", () => {
		expect(minIncrementOperations([2, 3, 0, 0, 2], 4)).toBe(3);
		expect(minIncrementOperations([0, 1, 3, 3], 5)).toBe(2);
		expect(minIncrementOperations([1, 1, 2], 1)).toBe(0);
	});
});
