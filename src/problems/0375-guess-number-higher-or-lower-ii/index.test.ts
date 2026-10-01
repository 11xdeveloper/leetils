import { describe, expect, it } from "bun:test";
import { guessNumberHigherOrLowerII as getMoneyAmount } from ".";

/** The minimax recursion, memoized. */
const byRecursion = (n: number): number => {
	const memo = new Map<string, number>();
	const cost = (low: number, high: number): number => {
		if (low >= high) return 0;
		const key = `${low},${high}`;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		let best = Number.POSITIVE_INFINITY;
		for (let guess = low; guess <= high; guess++) {
			best = Math.min(
				best,
				guess + Math.max(cost(low, guess - 1), cost(guess + 1, high)),
			);
		}
		memo.set(key, best);
		return best;
	};
	return cost(1, n);
};

describe("375. Guess Number Higher or Lower II", () => {
	it("solves the examples from the problem statement", () => {
		expect(getMoneyAmount(10)).toBe(16);
		expect(getMoneyAmount(1)).toBe(0);
		expect(getMoneyAmount(2)).toBe(1);
	});

	it("matches the minimax recursion for every n up to 60", () => {
		for (let n = 1; n <= 60; n++)
			expect(getMoneyAmount(n)).toBe(byRecursion(n));
	});
});
