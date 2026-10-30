import { describe, expect, it } from "bun:test";
import { replaceElementsInAnArray as arrayChange } from ".";

describe("2295. Replace Elements in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			arrayChange(
				[1, 2, 4, 6],
				[
					[1, 3],
					[4, 7],
					[6, 1],
				],
			),
		).toEqual([3, 2, 7, 1]);
		expect(
			arrayChange(
				[1, 2],
				[
					[1, 3],
					[2, 1],
					[3, 2],
				],
			),
		).toEqual([2, 1]);
	});
});
