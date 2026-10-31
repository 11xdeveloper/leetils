import { describe, expect, it } from "bun:test";
import { minimumOperationsToTransformArray as minOperations } from ".";

describe("3724. Minimum Operations to Transform Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([2, 8], [1, 7, 3])).toBe(4);
		expect(minOperations([1, 3, 6], [2, 4, 5, 3])).toBe(4);
		expect(minOperations([2], [3, 4])).toBe(3);
	});
});
