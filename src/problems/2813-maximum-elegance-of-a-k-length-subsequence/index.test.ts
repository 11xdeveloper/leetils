import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumEleganceOfAKLengthSubsequence as findMaximumElegance } from ".";

/** Tries every choice of `k` items. */
const byBruteForce = (items: number[][], k: number): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << items.length; mask++) {
		const chosen = items.filter((_, i) => (mask >> i) & 1);
		if (chosen.length !== k) continue;
		const profit = chosen.reduce((s, [p = 0]) => s + p, 0);
		best = Math.max(best, profit + new Set(chosen.map(([, c]) => c)).size ** 2);
	}
	return best;
};

describe("2813. Maximum Elegance of a K-Length Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findMaximumElegance(
				[
					[3, 2],
					[5, 1],
					[10, 1],
				],
				2,
			),
		).toBe(17);
		expect(
			findMaximumElegance(
				[
					[3, 1],
					[3, 1],
					[2, 2],
					[5, 3],
				],
				3,
			),
		).toBe(19);
		expect(
			findMaximumElegance(
				[
					[1, 1],
					[2, 1],
					[3, 1],
				],
				3,
			),
		).toBe(7);
	});

	it("matches trying every choice on random inputs", () => {
		const random = createRandom(2813);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 9);
			const items = Array.from({ length: n }, () => [
				random.int(1, 12),
				random.int(1, 4),
			]);
			const k = random.int(1, n);
			expect(findMaximumElegance(items, k)).toBe(byBruteForce(items, k));
		}
	});
});
