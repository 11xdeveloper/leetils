import { describe, expect, it } from "bun:test";
import { integerBreak } from ".";

describe("343. Integer Break", () => {
	it("solves the examples from the problem statement", () => {
		expect(integerBreak(2)).toBe(1);
		expect(integerBreak(10)).toBe(36);
	});

	it("matches dynamic programming for every n up to the constraint of 58", () => {
		// best[i]: the largest product for i, split or not (splitting is optional inside).
		const best = [0, 1];
		for (let n = 2; n <= 58; n++) {
			let product = 0;
			for (let part = 1; part < n; part++)
				product = Math.max(
					product,
					part * Math.max(n - part, best[n - part] ?? 0),
				);
			best.push(product);
			expect(integerBreak(n)).toBe(product);
		}
	});
});
