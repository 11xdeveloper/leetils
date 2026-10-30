import { describe, expect, it } from "bun:test";
import { findIndicesWithIndexAndValueDifferenceI as findIndices } from ".";

describe("2903. Find Indices With Index and Value Difference I", () => {
	it("solves the examples from the problem statement", () => {
		expect(findIndices([5, 1, 4, 1], 2, 4)).toEqual([0, 3]);
		expect(findIndices([2, 1], 0, 0)).toEqual([0, 0]);
		expect(findIndices([1, 2, 3], 2, 4)).toEqual([-1, -1]);
	});
});
