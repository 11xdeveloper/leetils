import { describe, expect, it } from "bun:test";
import { numberOfExcellentPairs as countExcellentPairs } from ".";

describe("2354. Number of Excellent Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(countExcellentPairs([1, 2, 3, 1], 3)).toBe(5);
		expect(countExcellentPairs([5, 1, 1], 10)).toBe(0);
	});
});
