import { describe, expect, it } from "bun:test";
import { applyOperationsToAnArray as applyOperations } from ".";

describe("2460. Apply Operations to an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(applyOperations([1, 2, 2, 1, 1, 0])).toEqual([1, 4, 2, 0, 0, 0]);
		expect(applyOperations([0, 1])).toEqual([1, 0]);
	});
});
