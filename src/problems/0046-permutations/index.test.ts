import { describe, expect, it } from "bun:test";
import { permutations } from ".";

const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

describe("46. Permutations", () => {
	it("solves the examples from the problem statement", () => {
		expect(permutations([1, 2, 3])).toEqual([
			[1, 2, 3],
			[1, 3, 2],
			[2, 1, 3],
			[2, 3, 1],
			[3, 1, 2],
			[3, 2, 1],
		]);
		expect(permutations([0, 1])).toEqual([
			[0, 1],
			[1, 0],
		]);
		expect(permutations([1])).toEqual([[1]]);
	});

	it("returns every ordering exactly once, up to the constraint of 6 values", () => {
		for (let n = 1; n <= 6; n++) {
			const nums = Array.from({ length: n }, (_, i) => i * 3 - 5);
			const results = permutations(nums);
			expect(results).toHaveLength(factorial(n));
			expect(new Set(results.map((p) => p.join(","))).size).toBe(
				results.length,
			);
			for (const p of results) {
				expect(p.toSorted((a, b) => a - b)).toEqual(nums);
			}
		}
	});
});
