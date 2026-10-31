import { describe, expect, it } from "bun:test";
import { cyclicallyShiftRowsAndColumns as cyclicShift } from ".";

describe("4052. Cyclically Shift Rows and Columns", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			cyclicShift(
				2,
				[
					[1, 2],
					[3, 4],
				],
				[1, 0],
				[0, 1],
			),
		).toEqual([
			[2, 4],
			[3, 1],
		]);
		expect(
			cyclicShift(
				3,
				[
					[1, 2, 3],
					[4, 5, 6],
					[7, 8, 9],
				],
				[1, 2, 0],
				[2, 2, 1],
			),
		).toEqual([
			[7, 8, 5],
			[2, 3, 9],
			[6, 4, 1],
		]);
	});
});
