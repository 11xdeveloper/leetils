import { describe, expect, it } from "bun:test";
import { maximumSumScoreOfArray as maximumSumScore } from ".";

describe("2219. Maximum Sum Score of Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSumScore([4, 3, -2, 5])).toBe(10);
		expect(maximumSumScore([-3, -5])).toBe(-3);
	});
});
