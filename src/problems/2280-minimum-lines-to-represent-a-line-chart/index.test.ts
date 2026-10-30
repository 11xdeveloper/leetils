import { describe, expect, it } from "bun:test";
import { minimumLinesToRepresentALineChart as minimumLines } from ".";

describe("2280. Minimum Lines to Represent a Line Chart", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumLines([
				[1, 7],
				[2, 6],
				[3, 5],
				[4, 4],
				[5, 4],
				[6, 3],
				[7, 2],
				[8, 1],
			]),
		).toBe(3);
		expect(
			minimumLines([
				[3, 4],
				[1, 2],
				[7, 8],
				[2, 3],
			]),
		).toBe(1);
	});

	it("tells nearly equal slopes apart", () => {
		expect(
			minimumLines([
				[1, 1],
				[500_000_000, 499_999_999],
				[1_000_000_000, 999_999_998],
			]),
		).toBe(2);
		expect(minimumLines([[5, 5]])).toBe(0);
	});
});
