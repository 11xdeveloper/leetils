import { describe, expect, it } from "bun:test";
import { countNumberOfRectanglesContainingEachPoint as countRectangles } from ".";

describe("2250. Count Number of Rectangles Containing Each Point", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countRectangles(
				[
					[1, 2],
					[2, 3],
					[2, 5],
				],
				[
					[2, 1],
					[1, 4],
				],
			),
		).toEqual([2, 1]);
		expect(
			countRectangles(
				[
					[1, 1],
					[2, 2],
					[3, 3],
				],
				[
					[1, 3],
					[1, 1],
				],
			),
		).toEqual([1, 3]);
	});
});
