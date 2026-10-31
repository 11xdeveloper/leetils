import { describe, expect, it } from "bun:test";
import { weightedSumOfATree as weightedSum } from ".";

describe("4015. Weighted Sum of a Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(weightedSum([-1, 0, 0, 0, 2, 2], [5, 2, 3, 1, 4, 6])).toBe(37);
		expect(weightedSum([-1, 0, 1, 2], [1, 2, 3, 4])).toBe(20);
	});
});
