import { describe, expect, it } from "bun:test";
import { minimumNumberOfOperationsToMakeAllArrayElementsEqualTo1 as minOperations } from ".";

describe("2654. Minimum Number of Operations to Make All Array Elements Equal to 1", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([2, 6, 3, 4])).toBe(4);
		expect(minOperations([2, 10, 6, 14])).toBe(-1);
	});

	it("spreads an existing 1", () => {
		expect(minOperations([1, 4, 1, 6])).toBe(2);
	});
});
