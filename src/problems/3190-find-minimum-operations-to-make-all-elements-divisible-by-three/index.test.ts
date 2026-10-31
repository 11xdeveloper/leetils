import { describe, expect, it } from "bun:test";
import { findMinimumOperationsToMakeAllElementsDivisibleByThree as minimumOperations } from ".";

describe("3190. Find Minimum Operations to Make All Elements Divisible by Three", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumOperations([1, 2, 3, 4])).toBe(3);
		expect(minimumOperations([3, 6, 9])).toBe(0);
	});
});
