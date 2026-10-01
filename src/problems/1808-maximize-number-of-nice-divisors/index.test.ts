import { describe, expect, it } from "bun:test";
import { maximizeNumberOfNiceDivisors as maxNiceDivisors } from ".";

/** The best product of positive parts summing to n, by dynamic programming. */
const bestProducts = (limit: number): number[] => {
	const best = [0, 1];
	for (let n = 2; n <= limit; n++) {
		let product = n;
		for (let part = 1; part < n; part++)
			product = Math.max(product, part * (best[n - part] ?? 0));
		best.push(product);
	}
	return best;
};

describe("1808. Maximize Number of Nice Divisors", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxNiceDivisors(5)).toBe(6);
		expect(maxNiceDivisors(8)).toBe(18);
	});

	it("matches the best split for small inputs", () => {
		const best = bestProducts(40);
		for (let n = 1; n <= 40; n++)
			expect(maxNiceDivisors(n)).toBe((best[n] ?? 0) % 1_000_000_007);
	});

	it("handles 10^9", () => {
		expect(maxNiceDivisors(1_000_000_000)).toBeLessThan(1_000_000_007);
	});
});
