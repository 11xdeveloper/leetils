import { describe, expect, it } from "bun:test";
import { combinationSum } from ".";

describe("39. Combination Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(combinationSum([2, 3, 6, 7], 7)).toEqual([[2, 2, 3], [7]]);
		expect(combinationSum([2, 3, 5], 8)).toEqual([
			[2, 2, 2, 2],
			[2, 3, 3],
			[3, 5],
		]);
		expect(combinationSum([2], 1)).toEqual([]);
	});

	it("returns the same combinations whatever order the candidates are in", () => {
		expect(combinationSum([7, 6, 3, 2], 7)).toEqual([[2, 2, 3], [7]]);
	});

	it("repeats a single candidate as often as needed", () => {
		expect(combinationSum([2], 8)).toEqual([[2, 2, 2, 2]]);
		expect(combinationSum([3], 7)).toEqual([]);
	});

	it("returns nothing when every candidate is larger than the target", () => {
		expect(combinationSum([5, 10], 3)).toEqual([]);
	});

	it("never returns the same combination twice", () => {
		const combinations = combinationSum([2, 3, 4, 5, 6, 7, 8], 20);
		const keys = combinations.map((combination) => combination.join(","));
		expect(new Set(keys).size).toBe(keys.length);
		for (const combination of combinations) {
			expect(combination.reduce((sum, n) => sum + n, 0)).toBe(20);
			expect(combination).toEqual(combination.toSorted((a, b) => a - b));
		}
	});

	it("does not modify the candidates", () => {
		const candidates = [7, 6, 3, 2];
		combinationSum(candidates, 7);
		expect(candidates).toEqual([7, 6, 3, 2]);
	});
});
