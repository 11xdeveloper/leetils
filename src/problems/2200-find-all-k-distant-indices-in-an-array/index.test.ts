import { describe, expect, it } from "bun:test";
import { findAllKDistantIndicesInAnArray as findKDistantIndices } from ".";

describe("2200. Find All K-Distant Indices in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findKDistantIndices([3, 4, 9, 1, 3, 9, 5], 9, 1)).toEqual([
			1, 2, 3, 4, 5, 6,
		]);
		expect(findKDistantIndices([2, 2, 2, 2, 2], 2, 2)).toEqual([0, 1, 2, 3, 4]);
	});
});
