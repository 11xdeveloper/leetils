import { describe, expect, it } from "bun:test";
import { minimumAbsoluteDifferenceInSlidingSubmatrix as minAbsDiff } from ".";

describe("3567. Minimum Absolute Difference in Sliding Submatrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minAbsDiff(
				[
					[1, 8],
					[3, -2],
				],
				2,
			),
		).toEqual([[2]]);
		expect(minAbsDiff([[3, -1]], 1)).toEqual([[0, 0]]);
		expect(
			minAbsDiff(
				[
					[1, -2, 3],
					[2, 3, 5],
				],
				2,
			),
		).toEqual([[1, 2]]);
	});
});
