import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostForCuttingCakeI as minimumCost } from ".";

/** Memoised search over which cuts are left for each piece. */
const byBruteForce = (h: number[], v: number[]): number => {
	const memo = new Map<string, number>();
	const solve = (r1: number, r2: number, c1: number, c2: number): number => {
		if (r2 - r1 === 1 && c2 - c1 === 1) return 0;
		const key = `${r1},${r2},${c1},${c2}`;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		let best = Number.POSITIVE_INFINITY;
		for (let r = r1 + 1; r < r2; r++)
			best = Math.min(
				best,
				(h[r - 1] ?? 0) + solve(r1, r, c1, c2) + solve(r, r2, c1, c2),
			);
		for (let c = c1 + 1; c < c2; c++)
			best = Math.min(
				best,
				(v[c - 1] ?? 0) + solve(r1, r2, c1, c) + solve(r1, r2, c, c2),
			);
		memo.set(key, best);
		return best;
	};
	return solve(0, h.length + 1, 0, v.length + 1);
};

describe("3218. Minimum Cost for Cutting Cake I", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCost(3, 2, [1, 3], [5])).toBe(13);
		expect(minimumCost(2, 2, [7], [4])).toBe(15);
	});

	it("matches searching every cutting order on random cakes", () => {
		const random = createRandom(3218);
		for (let run = 0; run < 100; run++) {
			const m = random.int(1, 4);
			const n = random.int(1, 4);
			const h = random.array(m - 1, 1, 9);
			const v = random.array(n - 1, 1, 9);
			expect(minimumCost(m, n, h, v)).toBe(byBruteForce(h, v));
		}
	});
});
