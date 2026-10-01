import { describe, expect, it } from "bun:test";
import { countSubIslands } from ".";

describe("1905. Count Sub Islands", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countSubIslands(
				[
					[1, 1, 1, 0, 0],
					[0, 1, 1, 1, 1],
					[0, 0, 0, 0, 0],
					[1, 0, 0, 0, 0],
					[1, 1, 0, 1, 1],
				],
				[
					[1, 1, 1, 0, 0],
					[0, 0, 1, 1, 1],
					[0, 1, 0, 0, 0],
					[1, 0, 1, 1, 0],
					[0, 1, 0, 1, 0],
				],
			),
		).toBe(3);
		expect(
			countSubIslands(
				[
					[1, 0, 1, 0, 1],
					[1, 1, 1, 1, 1],
					[0, 0, 0, 0, 0],
					[1, 1, 1, 1, 1],
					[1, 0, 1, 0, 1],
				],
				[
					[0, 0, 0, 0, 0],
					[1, 1, 1, 1, 1],
					[0, 1, 0, 1, 0],
					[0, 1, 0, 1, 0],
					[1, 0, 0, 0, 1],
				],
			),
		).toBe(2);
	});
});
