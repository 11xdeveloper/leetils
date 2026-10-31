import { describe, expect, it } from "bun:test";
import { numberOfIncreasingPathsInAGrid as countPaths } from ".";

describe("2328. Number of Increasing Paths in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countPaths([
				[1, 1],
				[3, 4],
			]),
		).toBe(8);
		expect(countPaths([[1], [2]])).toBe(3);
	});
});
