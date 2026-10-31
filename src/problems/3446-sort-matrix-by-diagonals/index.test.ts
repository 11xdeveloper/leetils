import { describe, expect, it } from "bun:test";
import { sortMatrixByDiagonals as sortMatrix } from ".";

describe("3446. Sort Matrix by Diagonals", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sortMatrix([
				[1, 7, 3],
				[9, 8, 2],
				[4, 5, 6],
			]),
		).toEqual([
			[8, 2, 3],
			[9, 6, 7],
			[4, 5, 1],
		]);
		expect(
			sortMatrix([
				[0, 1],
				[1, 2],
			]),
		).toEqual([
			[2, 1],
			[1, 0],
		]);
		expect(sortMatrix([[1]])).toEqual([[1]]);
	});
});
