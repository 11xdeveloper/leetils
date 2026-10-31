import { describe, expect, it } from "bun:test";
import { numberOfIntegersWithPopcountDepthEqualToKII as popcountDepth } from ".";

describe("3624. Number of Integers With Popcount-Depth Equal to K II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			popcountDepth(
				[2, 4],
				[
					[1, 0, 1, 1],
					[2, 1, 1],
					[1, 0, 1, 0],
				],
			),
		).toEqual([2, 1]);
		expect(
			popcountDepth(
				[3, 5, 6],
				[
					[1, 0, 2, 2],
					[2, 1, 4],
					[1, 1, 2, 1],
					[1, 0, 1, 0],
				],
			),
		).toEqual([3, 1, 0]);
		expect(
			popcountDepth(
				[1, 2],
				[
					[1, 0, 1, 1],
					[2, 0, 3],
					[1, 0, 0, 1],
					[1, 0, 0, 2],
				],
			),
		).toEqual([1, 0, 1]);
	});

	it("handles values beyond 32 bits", () => {
		expect(popcountDepth([2 ** 49 + 2 ** 40 + 1], [[1, 0, 0, 3]])).toEqual([1]);
	});
});
