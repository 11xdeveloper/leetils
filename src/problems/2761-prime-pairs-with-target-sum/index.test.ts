import { describe, expect, it } from "bun:test";
import { primePairsWithTargetSum as findPrimePairs } from ".";

describe("2761. Prime Pairs With Target Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(findPrimePairs(10)).toEqual([
			[3, 7],
			[5, 5],
		]);
		expect(findPrimePairs(2)).toEqual([]);
	});

	it("handles small n", () => {
		expect(findPrimePairs(1)).toEqual([]);
		expect(findPrimePairs(4)).toEqual([[2, 2]]);
	});
});
