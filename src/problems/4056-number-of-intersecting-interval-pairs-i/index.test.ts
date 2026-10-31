import { describe, expect, it } from "bun:test";
import { numberOfIntersectingIntervalPairsI as countIntersectingIntervals } from ".";

describe("4056. Number of Intersecting Interval Pairs I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countIntersectingIntervals([
				[1, 2],
				[2, 3],
				[3, 4],
			]),
		).toBe(2);
		expect(
			countIntersectingIntervals([
				[1, 5],
				[2, 4],
				[3, 6],
			]),
		).toBe(3);
		expect(
			countIntersectingIntervals([
				[1, 2],
				[3, 4],
				[5, 6],
			]),
		).toBe(0);
	});
});
