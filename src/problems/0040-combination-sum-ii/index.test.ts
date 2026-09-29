import { describe, expect, it } from "bun:test";
import { combinationSumII } from ".";

/** Tries every subset of the candidates. */
const byBruteForce = (candidates: number[], target: number): number[][] => {
	const found = new Map<string, number[]>();
	for (let mask = 0; mask < 1 << candidates.length; mask++) {
		const subset = candidates.filter((_, i) => mask & (1 << i));
		if (subset.reduce((sum, n) => sum + n, 0) === target) {
			const sorted = subset.toSorted((a, b) => a - b);
			found.set(sorted.join(","), sorted);
		}
	}
	return [...found.values()];
};

const normalize = (combinations: number[][]): string[] =>
	combinations.map((combination) => combination.join(",")).toSorted();

describe("40. Combination Sum II", () => {
	it("solves the examples from the problem statement", () => {
		expect(combinationSumII([10, 1, 2, 7, 6, 1, 5], 8)).toEqual([
			[1, 1, 6],
			[1, 2, 5],
			[1, 7],
			[2, 6],
		]);
		expect(combinationSumII([2, 5, 2, 1, 2], 5)).toEqual([[1, 2, 2], [5]]);
	});

	it("uses each candidate at most once", () => {
		expect(combinationSumII([2], 4)).toEqual([]);
		expect(combinationSumII([2, 2], 4)).toEqual([[2, 2]]);
	});

	it("returns each combination once when many candidates repeat", () => {
		expect(combinationSumII(Array(30).fill(1), 3)).toEqual([[1, 1, 1]]);
	});

	it("does not modify the candidates", () => {
		const candidates = [10, 1, 2, 7, 6, 1, 5];
		combinationSumII(candidates, 8);
		expect(candidates).toEqual([10, 1, 2, 7, 6, 1, 5]);
	});

	it("matches trying every subset on random inputs", () => {
		let seed = 40;
		const next = () => {
			seed = (seed * 1103515245 + 12345) % 2 ** 31;
			return seed;
		};
		for (let run = 0; run < 200; run++) {
			const candidates = Array.from(
				{ length: 1 + (run % 12) },
				() => 1 + (next() % 6),
			);
			const target = 1 + (next() % 15);
			expect(normalize(combinationSumII(candidates, target))).toEqual(
				normalize(byBruteForce(candidates, target)),
			);
		}
	});
});
