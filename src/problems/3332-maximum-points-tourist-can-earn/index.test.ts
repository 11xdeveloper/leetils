import { describe, expect, it } from "bun:test";
import { maximumPointsTouristCanEarn as maxScore } from ".";

describe("3332. Maximum Points Tourist Can Earn", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxScore(
				2,
				1,
				[[2, 3]],
				[
					[0, 2],
					[1, 0],
				],
			),
		).toBe(3);
		expect(
			maxScore(
				3,
				2,
				[
					[3, 4, 2],
					[2, 1, 2],
				],
				[
					[0, 2, 1],
					[2, 0, 4],
					[3, 2, 0],
				],
			),
		).toBe(8);
	});
});
