import { describe, expect, it } from "bun:test";
import { findTheDifferenceOfTwoArrays as findDifference } from ".";

describe("2215. Find the Difference of Two Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(findDifference([1, 2, 3], [2, 4, 6])).toEqual([
			[1, 3],
			[4, 6],
		]);
		expect(findDifference([1, 2, 3, 3], [1, 1, 2, 2])).toEqual([[3], []]);
	});
});
