import { describe, expect, it } from "bun:test";
import { divideArrayIntoArraysWithMaxDifference as divideArray } from ".";

describe("2966. Divide Array Into Arrays With Max Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(divideArray([1, 3, 4, 8, 7, 9, 3, 5, 1], 2)).toEqual([
			[1, 1, 3],
			[3, 4, 5],
			[7, 8, 9],
		]);
		expect(divideArray([2, 4, 2, 2, 5, 2], 2)).toEqual([]);
		expect(
			divideArray(
				[4, 2, 9, 8, 2, 12, 7, 12, 10, 5, 8, 5, 5, 7, 9, 2, 5, 11],
				14,
			),
		).toEqual([
			[2, 2, 2],
			[4, 5, 5],
			[5, 5, 7],
			[7, 8, 8],
			[9, 9, 10],
			[11, 12, 12],
		]);
	});
});
