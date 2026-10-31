import { describe, expect, it } from "bun:test";
import { balancedKFactorDecomposition as minDifference } from ".";

/** The best gap over every way to split, by brute force. */
const bestGap = (n: number, k: number): number => {
	if (k === 1) return 0;
	let best = Number.POSITIVE_INFINITY;
	for (let d = 1; d <= n; d++) {
		if (n % d !== 0) continue;
		const go = (
			rest: number,
			parts: number,
			low: number,
			high: number,
		): void => {
			if (parts === 0) {
				if (rest === 1) best = Math.min(best, high - low);
				return;
			}
			for (let e = 1; e <= rest; e++)
				if (rest % e === 0)
					go(rest / e, parts - 1, Math.min(low, e), Math.max(high, e));
		};
		go(n / d, k - 1, d, d);
	}
	return best;
};

describe("3669. Balanced K-Factor Decomposition", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDifference(100, 2)).toEqual([10, 10]);
		expect(minDifference(44, 3)).toEqual([2, 2, 11]);
	});

	it("finds a balanced split for small inputs", () => {
		for (let n = 4; n <= 60; n++)
			for (let k = 2; k <= 3; k++) {
				const parts = minDifference(n, k);
				expect(parts).toHaveLength(k);
				expect(parts.reduce((a, b) => a * b, 1)).toBe(n);
				expect(Math.max(...parts) - Math.min(...parts)).toBe(bestGap(n, k));
			}
	});
});
