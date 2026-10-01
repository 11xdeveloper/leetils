import { describe, expect, it } from "bun:test";
import { countWaysToDistributeCandies as waysToDistribute } from ".";

/** Counts restricted growth strings: each candy joins an earlier bag or opens the next. */
const byBruteForce = (n: number, k: number): number => {
	const place = (candy: number, bags: number): number => {
		if (candy === n) return bags === k ? 1 : 0;
		let ways = bags * place(candy + 1, bags);
		if (bags < k) ways += place(candy + 1, bags + 1);
		return ways;
	};
	return place(0, 0);
};

describe("1692. Count Ways to Distribute Candies", () => {
	it("solves the examples from the problem statement", () => {
		expect(waysToDistribute(3, 2)).toBe(3);
		expect(waysToDistribute(4, 2)).toBe(7);
		expect(waysToDistribute(20, 5)).toBe(206085257);
	});

	it("matches placing candies one by one for small inputs", () => {
		for (let n = 1; n <= 9; n++) {
			for (let k = 1; k <= n; k++)
				expect(waysToDistribute(n, k)).toBe(byBruteForce(n, k));
		}
	});

	it("handles the largest input", () => {
		expect(waysToDistribute(1000, 1000)).toBe(1);
		expect(waysToDistribute(1000, 1)).toBe(1);
	});
});
