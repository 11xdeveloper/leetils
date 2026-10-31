import { describe, expect, it } from "bun:test";
import { minimumOperationsToEqualizeArray as minOperations } from ".";

describe("3674. Minimum Operations to Equalize Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([1, 2])).toBe(1);
		expect(minOperations([5, 5, 5])).toBe(0);
	});
});
