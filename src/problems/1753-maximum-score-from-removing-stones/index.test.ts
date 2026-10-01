import { describe, expect, it } from "bun:test";
import { maximumScoreFromRemovingStones as maximumScore } from ".";

describe("1753. Maximum Score From Removing Stones", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumScore(2, 4, 6)).toBe(6);
		expect(maximumScore(4, 4, 6)).toBe(7);
		expect(maximumScore(1, 8, 8)).toBe(8);
	});

	it("matches a memoised search for small piles", () => {
		const memo = new Map<string, number>();
		const best = (piles: number[]): number => {
			const key = piles.toSorted((x, y) => x - y).join(",");
			const cached = memo.get(key);
			if (cached !== undefined) return cached;
			let result = 0;
			for (let i = 0; i < 3; i++) {
				for (let j = i + 1; j < 3; j++) {
					if (!piles[i] || !piles[j]) continue;
					result = Math.max(
						result,
						1 + best(piles.map((p, k) => (k === i || k === j ? p - 1 : p))),
					);
				}
			}
			memo.set(key, result);
			return result;
		};
		for (let a = 1; a <= 8; a++)
			for (let b = 1; b <= 8; b++)
				for (let c = 1; c <= 8; c++)
					expect(maximumScore(a, b, c)).toBe(best([a, b, c]));
	});
});
