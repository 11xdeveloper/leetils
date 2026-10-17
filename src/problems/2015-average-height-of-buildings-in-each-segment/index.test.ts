import { describe, expect, it } from "bun:test";
import { averageHeightOfBuildingsInEachSegment as averageHeights } from ".";

describe("2015. Average Height of Buildings in Each Segment", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			averageHeights([
				[1, 4, 2],
				[3, 9, 4],
			]),
		).toEqual([
			[1, 3, 2],
			[3, 4, 3],
			[4, 9, 4],
		]);
		expect(
			averageHeights([
				[1, 3, 2],
				[2, 5, 3],
				[2, 8, 3],
			]),
		).toEqual([
			[1, 3, 2],
			[3, 8, 3],
		]);
		expect(
			averageHeights([
				[1, 2, 1],
				[5, 6, 1],
			]),
		).toEqual([
			[1, 2, 1],
			[5, 6, 1],
		]);
	});

	it("merges buildings that touch end to end", () => {
		expect(
			averageHeights([
				[1, 2, 5],
				[2, 4, 5],
			]),
		).toEqual([[1, 4, 5]]);
	});
});
