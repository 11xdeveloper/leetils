import { describe, expect, it } from "bun:test";
import { findOccurrencesOfAnElementInAnArray as occurrencesOfElement } from ".";

describe("3159. Find Occurrences of an Element in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(occurrencesOfElement([1, 3, 1, 7], [1, 3, 2, 4], 1)).toEqual([
			0, -1, 2, -1,
		]);
		expect(occurrencesOfElement([1, 2, 3], [10], 5)).toEqual([-1]);
	});
});
