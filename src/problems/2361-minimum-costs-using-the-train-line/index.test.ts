import { describe, expect, it } from "bun:test";
import { minimumCostsUsingTheTrainLine as minimumCosts } from ".";

describe("2361. Minimum Costs Using the Train Line", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCosts([1, 6, 9, 5], [5, 2, 3, 10], 8)).toEqual([
			1, 7, 14, 19,
		]);
		expect(minimumCosts([11, 5, 13], [7, 10, 6], 3)).toEqual([10, 15, 24]);
	});
});
