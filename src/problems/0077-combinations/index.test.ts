import { describe, expect, it } from "bun:test";
import { combinations } from ".";

const binomial = (n: number, k: number): number => {
	let result = 1;
	for (let i = 1; i <= k; i++) result = (result * (n - k + i)) / i;
	return result;
};

describe("77. Combinations", () => {
	it("solves the examples from the problem statement", () => {
		expect(combinations(4, 2)).toEqual([
			[1, 2],
			[1, 3],
			[1, 4],
			[2, 3],
			[2, 4],
			[3, 4],
		]);
		expect(combinations(1, 1)).toEqual([[1]]);
	});

	it("returns a single combination when k is n", () => {
		expect(combinations(5, 5)).toEqual([[1, 2, 3, 4, 5]]);
	});

	it("returns C(n, k) distinct ascending combinations", () => {
		for (let n = 1; n <= 10; n++) {
			for (let k = 1; k <= n; k++) {
				const results = combinations(n, k);
				expect(results).toHaveLength(binomial(n, k));
				expect(new Set(results.map((c) => c.join(","))).size).toBe(
					results.length,
				);
				for (const combination of results) {
					expect(combination).toHaveLength(k);
					expect(combination).toEqual(combination.toSorted((a, b) => a - b));
					expect(new Set(combination).size).toBe(k);
				}
			}
		}
	});
});
