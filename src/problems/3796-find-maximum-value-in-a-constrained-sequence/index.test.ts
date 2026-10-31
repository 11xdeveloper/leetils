import { describe, expect, it } from "bun:test";
import { findMaximumValueInAConstrainedSequence as findMaxVal } from ".";

describe("3796. Find Maximum Value in a Constrained Sequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findMaxVal(
				10,
				[
					[3, 1],
					[8, 1],
				],
				[2, 2, 3, 1, 4, 5, 1, 1, 2],
			),
		).toBe(6);
		expect(
			findMaxVal(
				8,
				[
					[3, 2],
					[6, 1],
				],
				[1, 1, 1, 1, 1, 1, 1],
			),
		).toBe(3);
	});
});
