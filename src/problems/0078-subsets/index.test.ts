import { describe, expect, it } from "bun:test";
import { subsets } from ".";

describe("78. Subsets", () => {
	it("solves the examples from the problem statement", () => {
		expect(subsets([1, 2, 3])).toEqual([
			[],
			[1],
			[2],
			[1, 2],
			[3],
			[1, 3],
			[2, 3],
			[1, 2, 3],
		]);
		expect(subsets([0])).toEqual([[], [0]]);
	});

	it("returns 2^n distinct subsets, up to the constraint of 10 numbers", () => {
		for (let n = 1; n <= 10; n++) {
			const nums = Array.from({ length: n }, (_, i) => i * 2 - 7);
			const results = subsets(nums);
			expect(results).toHaveLength(2 ** n);
			const keys = results.map((subset) =>
				subset.toSorted((a, b) => a - b).join(","),
			);
			expect(new Set(keys).size).toBe(results.length);
			for (const subset of results) {
				for (const value of subset) expect(nums).toContain(value);
			}
		}
	});
});
