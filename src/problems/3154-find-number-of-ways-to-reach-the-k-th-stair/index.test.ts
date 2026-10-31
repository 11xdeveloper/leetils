import { describe, expect, it } from "bun:test";
import { findNumberOfWaysToReachTheKThStair as waysToReachStair } from ".";

/** Explores every sequence of operations that can still return to k. */
const byBruteForce = (k: number): number => {
	const count = (stair: number, jump: number, wentDown: boolean): number => {
		if (stair > k + 1) return 0;
		let ways = stair === k ? 1 : 0;
		if (!wentDown && stair > 0) ways += count(stair - 1, jump, true);
		ways += count(stair + 2 ** jump, jump + 1, false);
		return ways;
	};
	return count(1, 0, false);
};

describe("3154. Find Number of Ways to Reach the K-th Stair", () => {
	it("solves the examples from the problem statement", () => {
		expect(waysToReachStair(0)).toBe(2);
		expect(waysToReachStair(1)).toBe(4);
	});

	it("matches exploring every sequence", () => {
		for (let k = 0; k <= 40; k++)
			expect(waysToReachStair(k)).toBe(byBruteForce(k));
	});
});
