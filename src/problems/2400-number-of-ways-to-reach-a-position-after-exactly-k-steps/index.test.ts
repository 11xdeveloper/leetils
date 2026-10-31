import { describe, expect, it } from "bun:test";
import { numberOfWaysToReachAPositionAfterExactlyKSteps as numberOfWays } from ".";

describe("2400. Number of Ways to Reach a Position After Exactly k Steps", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfWays(1, 2, 3)).toBe(3);
		expect(numberOfWays(2, 5, 10)).toBe(0);
	});

	it("reduces large counts", () => {
		// C(1000, 500) mod 10^9 + 7.
		let c = 1n;
		for (let i = 1n; i <= 500n; i++) c = (c * (500n + i)) / i;
		expect(numberOfWays(0, 0, 1000)).toBe(Number(c % 1_000_000_007n));
	});
});
