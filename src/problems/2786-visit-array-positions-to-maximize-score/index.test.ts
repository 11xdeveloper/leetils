import { describe, expect, it } from "bun:test";
import { visitArrayPositionsToMaximizeScore as maxScore } from ".";

describe("2786. Visit Array Positions to Maximize Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScore([2, 3, 6, 1, 9, 2], 5)).toBe(13);
		expect(maxScore([2, 4, 6, 8], 3)).toBe(20);
	});
});
