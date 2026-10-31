import { describe, expect, it } from "bun:test";
import { minimumOperationsToTransformArrayIntoAlternatingPrime as minOperations } from ".";

describe("3896. Minimum Operations to Transform Array into Alternating Prime", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([1, 2, 3, 4])).toBe(3);
		expect(minOperations([5, 6, 7, 8])).toBe(0);
		expect(minOperations([4, 4])).toBe(1);
	});
});
