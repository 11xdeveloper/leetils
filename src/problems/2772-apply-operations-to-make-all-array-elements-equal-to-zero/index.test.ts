import { describe, expect, it } from "bun:test";
import { applyOperationsToMakeAllArrayElementsEqualToZero as checkArray } from ".";

describe("2772. Apply Operations to Make All Array Elements Equal to Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkArray([2, 2, 3, 1, 1, 0], 3)).toBe(true);
		expect(checkArray([1, 3, 1, 1], 2)).toBe(false);
	});
});
