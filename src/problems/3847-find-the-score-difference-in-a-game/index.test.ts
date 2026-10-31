import { describe, expect, it } from "bun:test";
import { findTheScoreDifferenceInAGame as scoreDifference } from ".";

describe("3847. Find the Score Difference in a Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(scoreDifference([1, 2, 3])).toBe(0);
		expect(scoreDifference([2, 4, 2, 1, 2, 1])).toBe(4);
		expect(scoreDifference([1])).toBe(-1);
	});
});
