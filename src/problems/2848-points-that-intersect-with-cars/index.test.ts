import { describe, expect, it } from "bun:test";
import { pointsThatIntersectWithCars as numberOfPoints } from ".";

describe("2848. Points That Intersect With Cars", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfPoints([
				[3, 6],
				[1, 5],
				[4, 7],
			]),
		).toBe(7);
		expect(
			numberOfPoints([
				[1, 3],
				[5, 8],
			]),
		).toBe(7);
	});
});
