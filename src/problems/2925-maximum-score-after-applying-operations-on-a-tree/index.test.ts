import { describe, expect, it } from "bun:test";
import { maximumScoreAfterApplyingOperationsOnATree as maximumScoreAfterOperations } from ".";

describe("2925. Maximum Score After Applying Operations on a Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumScoreAfterOperations(
				[
					[0, 1],
					[0, 2],
					[0, 3],
					[2, 4],
					[4, 5],
				],
				[5, 2, 5, 2, 1, 1],
			),
		).toBe(11);
		expect(
			maximumScoreAfterOperations(
				[
					[0, 1],
					[0, 2],
					[1, 3],
					[1, 4],
					[2, 5],
					[2, 6],
				],
				[20, 10, 9, 7, 4, 3, 5],
			),
		).toBe(40);
	});
});
