import { describe, expect, it } from "bun:test";
import { maxIncreaseToKeepCitySkyline as maxIncreaseKeepingSkyline } from ".";

describe("807. Max Increase to Keep City Skyline", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxIncreaseKeepingSkyline([
				[3, 0, 8, 4],
				[2, 4, 5, 7],
				[9, 2, 6, 3],
				[0, 3, 1, 0],
			]),
		).toBe(35);
		expect(
			maxIncreaseKeepingSkyline([
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			]),
		).toBe(0);
	});
});
