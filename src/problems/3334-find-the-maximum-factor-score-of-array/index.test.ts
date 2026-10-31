import { describe, expect, it } from "bun:test";
import { findTheMaximumFactorScoreOfArray as maxScore } from ".";

describe("3334. Find the Maximum Factor Score of Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScore([2, 4, 8, 16])).toBe(64);
		expect(maxScore([1, 2, 3, 4, 5])).toBe(60);
		expect(maxScore([3])).toBe(9);
	});
});
