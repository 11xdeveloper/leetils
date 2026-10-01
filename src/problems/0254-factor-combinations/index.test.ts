import { describe, expect, it } from "bun:test";
import { factorCombinations } from ".";

/** Every non-decreasing list of two or more factors from 2 to n - 1 whose product is n. */
const byBruteForce = (n: number): string[] => {
	const results: string[] = [];
	const search = (
		remaining: number,
		smallest: number,
		factors: number[],
	): void => {
		if (remaining === 1) {
			if (factors.length >= 2) results.push(factors.join(","));
			return;
		}
		for (let factor = smallest; factor <= remaining && factor < n; factor++) {
			if (remaining % factor === 0)
				search(remaining / factor, factor, [...factors, factor]);
		}
	};
	search(n, 2, []);
	return results.toSorted();
};

const normalize = (combinations: number[][]): string[] =>
	combinations.map((combination) => combination.join(",")).toSorted();

describe("254. Factor Combinations", () => {
	it("solves the examples from the problem statement", () => {
		expect(factorCombinations(1)).toEqual([]);
		expect(normalize(factorCombinations(12))).toEqual(
			normalize([
				[2, 6],
				[3, 4],
				[2, 2, 3],
			]),
		);
		expect(factorCombinations(37)).toEqual([]);
	});

	it("keeps each combination in ascending order", () => {
		for (const combination of factorCombinations(360)) {
			expect(combination).toEqual(combination.toSorted((a, b) => a - b));
		}
	});

	it("matches searching every factor for every n up to 1000", () => {
		for (let n = 1; n <= 1000; n++) {
			expect(normalize(factorCombinations(n))).toEqual(byBruteForce(n));
		}
	});

	it("handles the constraint of 10^7", () => {
		expect(factorCombinations(9_999_991)).toEqual([]);
		expect(factorCombinations(8_388_608).length).toBeGreaterThan(0);
	});
});
