import { describe, expect, it } from "bun:test";
import { convertAnArrayIntoA2dArrayWithConditions as findMatrix } from ".";

describe("2610. Convert an Array Into a 2D Array With Conditions", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMatrix([1, 3, 4, 1, 2, 3, 1])).toEqual([
			[1, 3, 4, 2],
			[1, 3],
			[1],
		]);
		// Any order within a row is accepted.
		expect(findMatrix([1, 2, 3, 4])).toEqual([[1, 2, 3, 4]]);
	});
});
