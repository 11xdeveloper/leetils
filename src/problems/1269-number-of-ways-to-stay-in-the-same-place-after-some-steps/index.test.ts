import { describe, expect, it } from "bun:test";
import { numberOfWaysToStayInTheSamePlaceAfterSomeSteps as numWays } from ".";

/** Tries every sequence of moves. */
const byBruteForce = (steps: number, arrLen: number): number => {
	const walk = (left: number, at: number): number => {
		if (at < 0 || at >= arrLen) return 0;
		if (left === 0) return at === 0 ? 1 : 0;
		return walk(left - 1, at - 1) + walk(left - 1, at) + walk(left - 1, at + 1);
	};
	return walk(steps, 0);
};

describe("1269. Number of Ways to Stay in the Same Place After Some Steps", () => {
	it("solves the examples from the problem statement", () => {
		expect(numWays(3, 2)).toBe(4);
		expect(numWays(2, 4)).toBe(2);
		expect(numWays(4, 2)).toBe(8);
	});

	it("handles a huge array and the most steps", () => {
		const ways = numWays(500, 10 ** 6);
		expect(ways).toBeGreaterThanOrEqual(0);
		expect(ways).toBeLessThan(1_000_000_007);
		expect(numWays(500, 1)).toBe(1);
	});

	it("matches trying every sequence of moves", () => {
		for (let steps = 1; steps <= 9; steps++) {
			for (let arrLen = 1; arrLen <= 6; arrLen++) {
				expect(numWays(steps, arrLen)).toBe(byBruteForce(steps, arrLen));
			}
		}
	});
});
