import { describe, expect, it } from "bun:test";
import { maximumScoreOfANodeSequence as maximumScore } from ".";

describe("2242. Maximum Score of a Node Sequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumScore(
				[5, 2, 9, 8, 4],
				[
					[0, 1],
					[1, 2],
					[2, 3],
					[0, 2],
					[1, 3],
					[2, 4],
				],
			),
		).toBe(24);
		expect(
			maximumScore(
				[9, 20, 6, 4, 11, 12],
				[
					[0, 3],
					[5, 3],
					[2, 4],
					[1, 3],
				],
			),
		).toBe(-1);
	});
});
