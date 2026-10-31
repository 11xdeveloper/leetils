import { describe, expect, it } from "bun:test";
import { mergeTwo2dArraysBySummingValues as mergeArrays } from ".";

describe("2570. Merge Two 2D Arrays by Summing Values", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			mergeArrays(
				[
					[1, 2],
					[2, 3],
					[4, 5],
				],
				[
					[1, 4],
					[3, 2],
					[4, 1],
				],
			),
		).toEqual([
			[1, 6],
			[2, 3],
			[3, 2],
			[4, 6],
		]);
		expect(
			mergeArrays(
				[
					[2, 4],
					[3, 6],
					[5, 5],
				],
				[
					[1, 3],
					[4, 3],
				],
			),
		).toEqual([
			[1, 3],
			[2, 4],
			[3, 6],
			[4, 3],
			[5, 5],
		]);
	});
});
