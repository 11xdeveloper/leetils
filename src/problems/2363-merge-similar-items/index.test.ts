import { describe, expect, it } from "bun:test";
import { mergeSimilarItems } from ".";

describe("2363. Merge Similar Items", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			mergeSimilarItems(
				[
					[1, 1],
					[4, 5],
					[3, 8],
				],
				[
					[3, 1],
					[1, 5],
				],
			),
		).toEqual([
			[1, 6],
			[3, 9],
			[4, 5],
		]);
		expect(
			mergeSimilarItems(
				[
					[1, 3],
					[2, 2],
				],
				[
					[7, 1],
					[2, 2],
					[1, 4],
				],
			),
		).toEqual([
			[1, 7],
			[2, 4],
			[7, 1],
		]);
	});
});
