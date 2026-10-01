import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeTheArrayIncreasing as minOperations } from ".";

describe("1827. Minimum Operations to Make the Array Increasing", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([1, 1, 1])).toBe(3);
		expect(minOperations([1, 5, 2, 4, 1])).toBe(14);
		expect(minOperations([8])).toBe(0);
	});
});
