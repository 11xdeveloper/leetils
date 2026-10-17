import { describe, expect, it } from "bun:test";
import { numberOfPairsOfInterchangeableRectangles as interchangeablePairs } from ".";

describe("2001. Number of Pairs of Interchangeable Rectangles", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			interchangeablePairs([
				[4, 8],
				[3, 6],
				[10, 20],
				[15, 30],
			]),
		).toBe(6);
		expect(
			interchangeablePairs([
				[4, 5],
				[7, 8],
			]),
		).toBe(0);
	});

	it("compares ratios exactly", () => {
		expect(
			interchangeablePairs([
				[99_999, 100_000],
				[99_998, 99_999],
				[1, 1],
				[100_000, 100_000],
			]),
		).toBe(1);
	});
});
