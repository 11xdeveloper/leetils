import { describe, expect, it } from "bun:test";
import { countUnguardedCellsInTheGrid as countUnguarded } from ".";

describe("2257. Count Unguarded Cells in the Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countUnguarded(
				4,
				6,
				[
					[0, 0],
					[1, 1],
					[2, 3],
				],
				[
					[0, 1],
					[2, 2],
					[1, 4],
				],
			),
		).toBe(7);
		expect(
			countUnguarded(
				3,
				3,
				[[1, 1]],
				[
					[0, 1],
					[1, 0],
					[2, 1],
					[1, 2],
				],
			),
		).toBe(4);
	});
});
