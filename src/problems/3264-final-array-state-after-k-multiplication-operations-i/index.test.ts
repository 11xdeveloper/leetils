import { describe, expect, it } from "bun:test";
import { finalArrayStateAfterKMultiplicationOperationsI as getFinalState } from ".";

describe("3264. Final Array State After K Multiplication Operations I", () => {
	it("solves the examples from the problem statement", () => {
		expect(getFinalState([2, 1, 3, 5, 6], 5, 2)).toEqual([8, 4, 6, 5, 6]);
		expect(getFinalState([1, 2], 3, 4)).toEqual([16, 8]);
	});
});
