import { describe, expect, it } from "bun:test";
import { findTargetIndicesAfterSortingArray as targetIndices } from ".";

describe("2089. Find Target Indices After Sorting Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(targetIndices([1, 2, 5, 2, 3], 2)).toEqual([1, 2]);
		expect(targetIndices([1, 2, 5, 2, 3], 3)).toEqual([3]);
		expect(targetIndices([1, 2, 5, 2, 3], 5)).toEqual([4]);
		expect(targetIndices([1, 2, 5, 2, 3], 4)).toEqual([]);
	});
});
