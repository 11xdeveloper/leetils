import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeArraySumDivisibleByK as minOperations } from ".";

describe("3512. Minimum Operations to Make Array Sum Divisible by K", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([3, 9, 7], 5)).toBe(4);
		expect(minOperations([4, 1, 3], 4)).toBe(0);
		expect(minOperations([3, 2], 6)).toBe(5);
	});
});
