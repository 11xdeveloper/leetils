import { describe, expect, it } from "bun:test";
import { calculateScoreAfterPerformingInstructions as calculateScore } from ".";

describe("3522. Calculate Score After Performing Instructions", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			calculateScore(
				["jump", "add", "add", "jump", "add", "jump"],
				[2, 1, 3, 1, -2, -3],
			),
		).toBe(1);
		expect(calculateScore(["jump", "add", "add"], [3, 1, 1])).toBe(0);
		expect(calculateScore(["jump"], [0])).toBe(0);
	});
});
