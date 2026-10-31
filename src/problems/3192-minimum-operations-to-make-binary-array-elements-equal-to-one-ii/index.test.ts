import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeBinaryArrayElementsEqualToOneII as minOperations } from ".";

describe("3192. Minimum Operations to Make Binary Array Elements Equal to One II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([0, 1, 1, 0, 1])).toBe(4);
		expect(minOperations([1, 0, 0, 0])).toBe(1);
	});
});
