import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumScoreUsingExactlyKPairs as maxScore } from ".";

/** Tries every choice of indices. */
const byBruteForce = (a: number[], b: number[], k: number): number => {
	const choose = (n: number): number[][] => {
		const out: number[][] = [];
		for (let mask = 0; mask < 1 << n; mask++) {
			const picked = Array.from({ length: n }, (_, i) => i).filter(
				(i) => (mask >> i) & 1,
			);
			if (picked.length === k) out.push(picked);
		}
		return out;
	};
	let best = Number.NEGATIVE_INFINITY;
	for (const is of choose(a.length))
		for (const js of choose(b.length))
			best = Math.max(
				best,
				is.reduce((s, i, t) => s + (a[i] ?? 0) * (b[js[t] ?? 0] ?? 0), 0),
			);
	return best;
};

describe("3836. Maximum Score Using Exactly K Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScore([1, 3, 2], [4, 5, 1], 2)).toBe(22);
		expect(maxScore([-2, 0, 5], [-3, 4, -1, 2], 2)).toBe(26);
		expect(maxScore([-3, -2], [1, 2], 2)).toBe(-7);
	});

	it("matches trying every choice on random arrays", () => {
		const random = createRandom(3836);
		for (let run = 0; run < 150; run++) {
			const [a, b] = [
				random.array(random.int(1, 6), -5, 5),
				random.array(random.int(1, 6), -5, 5),
			];
			const k = random.int(1, Math.min(a.length, b.length));
			expect(maxScore(a, b, k)).toBe(byBruteForce(a, b, k));
		}
	});
});
