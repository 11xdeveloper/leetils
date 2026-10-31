import { describe, expect, it } from "bun:test";
import { convert1dArrayInto2dArray as construct2DArray } from ".";

describe("2022. Convert 1D Array Into 2D Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(construct2DArray([1, 2, 3, 4], 2, 2)).toEqual([
			[1, 2],
			[3, 4],
		]);
		expect(construct2DArray([1, 2, 3], 1, 3)).toEqual([[1, 2, 3]]);
		expect(construct2DArray([1, 2], 1, 1)).toEqual([]);
	});
});
