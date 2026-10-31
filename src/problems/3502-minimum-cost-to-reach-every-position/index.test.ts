import { describe, expect, it } from "bun:test";
import { minimumCostToReachEveryPosition as minCosts } from ".";

describe("3502. Minimum Cost to Reach Every Position", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCosts([5, 3, 4, 1, 3, 2])).toEqual([5, 3, 3, 1, 1, 1]);
		expect(minCosts([1, 2, 4, 6, 7])).toEqual([1, 1, 1, 1, 1]);
	});
});
