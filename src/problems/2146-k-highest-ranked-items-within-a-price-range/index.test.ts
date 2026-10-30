import { describe, expect, it } from "bun:test";
import { kHighestRankedItemsWithinAPriceRange as highestRankedKItems } from ".";

describe("2146. K Highest Ranked Items Within a Price Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			highestRankedKItems(
				[
					[1, 2, 0, 1],
					[1, 3, 0, 1],
					[0, 2, 5, 1],
				],
				[2, 5],
				[0, 0],
				3,
			),
		).toEqual([
			[0, 1],
			[1, 1],
			[2, 1],
		]);
		expect(
			highestRankedKItems(
				[
					[1, 2, 0, 1],
					[1, 3, 3, 1],
					[0, 2, 5, 1],
				],
				[2, 3],
				[2, 3],
				2,
			),
		).toEqual([
			[2, 1],
			[1, 2],
		]);
		expect(
			highestRankedKItems(
				[
					[1, 1, 1],
					[0, 0, 1],
					[2, 3, 4],
				],
				[2, 3],
				[0, 0],
				3,
			),
		).toEqual([
			[2, 1],
			[2, 0],
		]);
	});
});
