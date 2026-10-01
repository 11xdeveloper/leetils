import { describe, expect, it } from "bun:test";
import { reductionOperationsToMakeTheArrayElementsEqual as reductionOperations } from ".";

describe("1887. Reduction Operations to Make the Array Elements Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(reductionOperations([5, 1, 3])).toBe(3);
		expect(reductionOperations([1, 1, 1])).toBe(0);
		expect(reductionOperations([1, 1, 2, 2, 3])).toBe(4);
	});
});
