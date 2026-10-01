import { describe, expect, it } from "bun:test";
import { combinationSumIII } from ".";

/** Tries every subset of 1 to 9. */
const byBruteForce = (k: number, n: number): number[][] => {
	const results: number[][] = [];
	for (let mask = 0; mask < 1 << 9; mask++) {
		const digits = Array.from({ length: 9 }, (_, i) => i + 1).filter(
			(_, i) => mask & (1 << i),
		);
		if (digits.length === k && digits.reduce((a, b) => a + b, 0) === n)
			results.push(digits);
	}
	return results.toSorted((a, b) => (a.join(",") < b.join(",") ? -1 : 1));
};

describe("216. Combination Sum III", () => {
	it("solves the examples from the problem statement", () => {
		expect(combinationSumIII(3, 7)).toEqual([[1, 2, 4]]);
		expect(combinationSumIII(3, 9)).toEqual([
			[1, 2, 6],
			[1, 3, 5],
			[2, 3, 4],
		]);
		expect(combinationSumIII(4, 1)).toEqual([]);
	});

	it("matches trying every subset of digits for every k and n in the constraints", () => {
		for (let k = 2; k <= 9; k++) {
			for (let n = 1; n <= 60; n++) {
				expect(combinationSumIII(k, n)).toEqual(byBruteForce(k, n));
			}
		}
	});
});
