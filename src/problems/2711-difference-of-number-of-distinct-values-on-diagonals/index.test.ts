import { describe, expect, it } from "bun:test";
import { differenceOfNumberOfDistinctValuesOnDiagonals as differenceOfDistinctValues } from ".";

describe("2711. Difference of Number of Distinct Values on Diagonals", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			differenceOfDistinctValues([
				[1, 2, 3],
				[3, 1, 5],
				[3, 2, 1],
			]),
		).toEqual([
			[1, 1, 0],
			[1, 0, 1],
			[0, 1, 1],
		]);
		expect(differenceOfDistinctValues([[1]])).toEqual([[0]]);
	});
});
