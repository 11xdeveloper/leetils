import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeArrayNonDecreasing as minOperations } from ".";

describe("3914. Minimum Operations to Make Array Non Decreasing", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([3, 3, 2, 1])).toBe(2);
		expect(minOperations([5, 1, 2, 3])).toBe(4);
	});
});
