import { describe, expect, it } from "bun:test";
import { maximumStarSumOfAGraph as maxStarSum } from ".";

describe("2497. Maximum Star Sum of a Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxStarSum(
				[1, 2, 3, 4, 10, -10, -20],
				[
					[0, 1],
					[1, 2],
					[1, 3],
					[3, 4],
					[3, 5],
					[3, 6],
				],
				2,
			),
		).toBe(16);
		expect(maxStarSum([-5], [], 0)).toBe(-5);
	});
});
