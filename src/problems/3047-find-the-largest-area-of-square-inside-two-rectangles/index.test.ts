import { describe, expect, it } from "bun:test";
import { findTheLargestAreaOfSquareInsideTwoRectangles as largestSquareArea } from ".";

describe("3047. Find the Largest Area of Square Inside Two Rectangles", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			largestSquareArea(
				[
					[1, 1],
					[2, 2],
					[3, 1],
				],
				[
					[3, 3],
					[4, 4],
					[6, 6],
				],
			),
		).toBe(1);
		expect(
			largestSquareArea(
				[
					[1, 1],
					[1, 3],
					[1, 5],
				],
				[
					[5, 5],
					[5, 7],
					[5, 9],
				],
			),
		).toBe(4);
		expect(
			largestSquareArea(
				[
					[1, 1],
					[2, 2],
					[1, 2],
				],
				[
					[3, 3],
					[4, 4],
					[3, 4],
				],
			),
		).toBe(1);
		expect(
			largestSquareArea(
				[
					[1, 1],
					[3, 3],
					[3, 1],
				],
				[
					[2, 2],
					[4, 4],
					[4, 2],
				],
			),
		).toBe(0);
	});
});
