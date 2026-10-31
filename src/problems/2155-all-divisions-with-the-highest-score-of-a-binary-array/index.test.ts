import { describe, expect, it } from "bun:test";
import { allDivisionsWithTheHighestScoreOfABinaryArray as maxScoreIndices } from ".";

describe("2155. All Divisions With the Highest Score of a Binary Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScoreIndices([0, 0, 1, 0])).toEqual([2, 4]);
		expect(maxScoreIndices([0, 0, 0])).toEqual([3]);
		expect(maxScoreIndices([1, 1])).toEqual([0]);
	});
});
