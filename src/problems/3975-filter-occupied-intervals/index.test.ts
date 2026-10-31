import { describe, expect, it } from "bun:test";
import { filterOccupiedIntervals } from ".";

describe("3975. Filter Occupied Intervals", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			filterOccupiedIntervals(
				[
					[2, 6],
					[4, 8],
					[10, 10],
					[10, 12],
					[14, 16],
				],
				7,
				11,
			),
		).toEqual([
			[2, 6],
			[12, 12],
			[14, 16],
		]);
		expect(
			filterOccupiedIntervals(
				[
					[1, 5],
					[2, 3],
				],
				3,
				8,
			),
		).toEqual([[1, 2]]);
	});

	it("splits an interval around the free time", () => {
		expect(filterOccupiedIntervals([[1, 10]], 4, 6)).toEqual([
			[1, 3],
			[7, 10],
		]);
	});
});
