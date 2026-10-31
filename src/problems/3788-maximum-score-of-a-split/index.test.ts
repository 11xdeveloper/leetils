import { describe, expect, it } from "bun:test";
import { maximumScoreOfASplit as maximumScore } from ".";

describe("3788. Maximum Score of a Split", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumScore([10, -1, 3, -4, -5])).toBe(17);
		expect(maximumScore([-7, -5, 3])).toBe(-2);
		expect(maximumScore([1, 1])).toBe(0);
	});
});
