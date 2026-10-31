import { describe, expect, it } from "bun:test";
import { countIslandsWithTotalValueDivisibleByK as countIslands } from ".";

describe("3619. Count Islands With Total Value Divisible by K", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countIslands(
				[
					[0, 2, 1, 0, 0],
					[0, 5, 0, 0, 5],
					[0, 0, 1, 0, 0],
					[0, 1, 4, 7, 0],
					[0, 2, 0, 0, 8],
				],
				5,
			),
		).toBe(2);
		expect(
			countIslands(
				[
					[3, 0, 3, 0],
					[0, 3, 0, 3],
					[3, 0, 3, 0],
				],
				3,
			),
		).toBe(6);
	});
});
