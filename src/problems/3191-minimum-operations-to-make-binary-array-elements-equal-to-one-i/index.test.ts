import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeBinaryArrayElementsEqualToOneI as minOperations } from ".";

describe("3191. Minimum Operations to Make Binary Array Elements Equal to One I", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([0, 1, 1, 1, 0, 0])).toBe(3);
		expect(minOperations([0, 1, 1, 1])).toBe(-1);
	});
});
