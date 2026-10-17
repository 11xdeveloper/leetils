import { describe, expect, it } from "bun:test";
import { countFertilePyramidsInALand as countPyramids } from ".";

describe("2088. Count Fertile Pyramids in a Land", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countPyramids([
				[0, 1, 1, 0],
				[1, 1, 1, 1],
			]),
		).toBe(2);
		expect(
			countPyramids([
				[1, 1, 1],
				[1, 1, 1],
			]),
		).toBe(2);
		expect(
			countPyramids([
				[1, 1, 1, 1, 0],
				[1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1],
				[0, 1, 0, 0, 1],
			]),
		).toBe(13);
	});

	it("needs at least two rows", () => {
		expect(countPyramids([[1, 1, 1]])).toBe(0);
	});
});
