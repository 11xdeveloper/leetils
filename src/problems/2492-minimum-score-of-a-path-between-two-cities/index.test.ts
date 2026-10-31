import { describe, expect, it } from "bun:test";
import { minimumScoreOfAPathBetweenTwoCities as minScore } from ".";

describe("2492. Minimum Score of a Path Between Two Cities", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minScore(4, [
				[1, 2, 9],
				[2, 3, 6],
				[2, 4, 5],
				[1, 4, 7],
			]),
		).toBe(5);
		expect(
			minScore(4, [
				[1, 2, 2],
				[1, 3, 4],
				[3, 4, 7],
			]),
		).toBe(2);
	});
});
