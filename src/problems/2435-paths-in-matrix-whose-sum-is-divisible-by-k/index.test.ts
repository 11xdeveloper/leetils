import { describe, expect, it } from "bun:test";
import { pathsInMatrixWhoseSumIsDivisibleByK as numberOfPaths } from ".";

describe("2435. Paths in Matrix Whose Sum Is Divisible by K", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfPaths(
				[
					[5, 2, 4],
					[3, 0, 5],
					[0, 7, 2],
				],
				3,
			),
		).toBe(2);
		expect(numberOfPaths([[0, 0]], 5)).toBe(1);
		expect(
			numberOfPaths(
				[
					[7, 3, 4, 9],
					[2, 3, 6, 2],
					[2, 3, 7, 0],
				],
				1,
			),
		).toBe(10);
	});
});
