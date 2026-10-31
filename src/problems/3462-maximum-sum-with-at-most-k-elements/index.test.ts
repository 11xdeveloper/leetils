import { describe, expect, it } from "bun:test";
import { maximumSumWithAtMostKElements as maxSum } from ".";

describe("3462. Maximum Sum With at Most K Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxSum(
				[
					[1, 2],
					[3, 4],
				],
				[1, 2],
				2,
			),
		).toBe(7);
		expect(
			maxSum(
				[
					[5, 3, 7],
					[8, 2, 6],
				],
				[2, 2],
				3,
			),
		).toBe(21);
	});
});
