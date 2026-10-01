import { describe, expect, it } from "bun:test";
import { numberOfRectanglesThatCanFormTheLargestSquare as countGoodRectangles } from ".";

describe("1725. Number Of Rectangles That Can Form The Largest Square", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countGoodRectangles([
				[5, 8],
				[3, 9],
				[5, 12],
				[16, 5],
			]),
		).toBe(3);
		expect(
			countGoodRectangles([
				[2, 3],
				[3, 7],
				[4, 3],
				[3, 7],
			]),
		).toBe(3);
	});
});
