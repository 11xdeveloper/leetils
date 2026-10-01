import { describe, expect, it } from "bun:test";
import { FindingPairsWithACertainSum as FindSumPairs } from ".";

describe("1865. Finding Pairs With a Certain Sum", () => {
	it("solves the example from the problem statement", () => {
		const pairs = new FindSumPairs([1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]);
		expect(pairs.count(7)).toBe(8);
		pairs.add(3, 2);
		expect(pairs.count(8)).toBe(2);
		expect(pairs.count(4)).toBe(1);
		pairs.add(0, 1);
		pairs.add(1, 1);
		expect(pairs.count(7)).toBe(11);
	});

	it("doesn't modify the input arrays", () => {
		const nums2 = [1, 2];
		new FindSumPairs([1], nums2).add(0, 5);
		expect(nums2).toEqual([1, 2]);
	});
});
