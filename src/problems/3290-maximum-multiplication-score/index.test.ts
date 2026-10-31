import { describe, expect, it } from "bun:test";
import { maximumMultiplicationScore as maxScore } from ".";

describe("3290. Maximum Multiplication Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScore([3, 2, 5, 6], [2, -6, 4, -5, -3, 2, -7])).toBe(26);
		expect(maxScore([-1, 4, 5, -2], [-5, -1, -3, -2, -4])).toBe(-1);
	});
});
