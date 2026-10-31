import { describe, expect, it } from "bun:test";
import { distributeElementsIntoTwoArraysI as resultArray } from ".";

describe("3069. Distribute Elements Into Two Arrays I", () => {
	it("solves the examples from the problem statement", () => {
		expect(resultArray([2, 1, 3])).toEqual([2, 3, 1]);
		expect(resultArray([5, 4, 3, 8])).toEqual([5, 3, 4, 8]);
	});
});
