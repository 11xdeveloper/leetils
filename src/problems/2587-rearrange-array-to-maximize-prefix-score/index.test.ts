import { describe, expect, it } from "bun:test";
import { rearrangeArrayToMaximizePrefixScore as maxScore } from ".";

describe("2587. Rearrange Array to Maximize Prefix Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScore([2, -1, 0, 1, -3, 3, -3])).toBe(6);
		expect(maxScore([-2, -3, 0])).toBe(0);
	});
});
