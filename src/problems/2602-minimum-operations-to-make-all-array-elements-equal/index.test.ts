import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeAllArrayElementsEqual as minOperations } from ".";

describe("2602. Minimum Operations to Make All Array Elements Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([3, 1, 6, 8], [1, 5])).toEqual([14, 10]);
		expect(minOperations([2, 9, 6, 3], [10])).toEqual([20]);
	});
});
