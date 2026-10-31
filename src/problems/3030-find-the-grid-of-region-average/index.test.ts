import { describe, expect, it } from "bun:test";
import { findTheGridOfRegionAverage as resultGrid } from ".";

describe("3030. Find the Grid of Region Average", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			resultGrid(
				[
					[5, 6, 7, 10],
					[8, 9, 10, 10],
					[11, 12, 13, 10],
				],
				3,
			),
		).toEqual([
			[9, 9, 9, 9],
			[9, 9, 9, 9],
			[9, 9, 9, 9],
		]);
		expect(
			resultGrid(
				[
					[10, 20, 30],
					[15, 25, 35],
					[20, 30, 40],
					[25, 35, 45],
				],
				12,
			),
		).toEqual([
			[25, 25, 25],
			[27, 27, 27],
			[27, 27, 27],
			[30, 30, 30],
		]);
		expect(
			resultGrid(
				[
					[5, 6, 7],
					[8, 9, 10],
					[11, 12, 13],
				],
				1,
			),
		).toEqual([
			[5, 6, 7],
			[8, 9, 10],
			[11, 12, 13],
		]);
	});
});
