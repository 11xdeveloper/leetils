import { describe, expect, it } from "bun:test";
import { solvingQuestionsWithBrainpower as mostPoints } from ".";

describe("2140. Solving Questions With Brainpower", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			mostPoints([
				[3, 2],
				[4, 3],
				[4, 4],
				[2, 5],
			]),
		).toBe(5);
		expect(
			mostPoints([
				[1, 1],
				[2, 2],
				[3, 3],
				[4, 4],
				[5, 5],
			]),
		).toBe(7);
	});
});
