import { describe, expect, it } from "bun:test";
import { countNumberOfPairsWithAbsoluteDifferenceK as pairsWithDifference } from ".";

describe("2006. Count Number of Pairs With Absolute Difference K", () => {
	it("solves the examples from the problem statement", () => {
		expect(pairsWithDifference([1, 2, 2, 1], 1)).toBe(4);
		expect(pairsWithDifference([1, 3], 3)).toBe(0);
		expect(pairsWithDifference([3, 2, 1, 5, 4], 2)).toBe(3);
	});
});
