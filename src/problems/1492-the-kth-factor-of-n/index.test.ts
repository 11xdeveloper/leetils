import { describe, expect, it } from "bun:test";
import { theKthFactorOfN as kthFactor } from ".";

describe("1492. The kth Factor of n", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthFactor(12, 3)).toBe(3);
		expect(kthFactor(7, 2)).toBe(7);
		expect(kthFactor(4, 4)).toBe(-1);
	});

	it("matches listing every factor for every n and k up to 1000", () => {
		for (let n = 1; n <= 1000; n++) {
			const factors = Array.from({ length: n }, (_, i) => i + 1).filter(
				(d) => n % d === 0,
			);
			for (let k = 1; k <= factors.length + 1; k++)
				expect(kthFactor(n, k)).toBe(factors[k - 1] ?? -1);
		}
	});
});
