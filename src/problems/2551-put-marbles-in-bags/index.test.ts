import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { putMarblesInBags } from ".";

/** Tries every choice of cuts. */
const byBruteForce = (weights: number[], k: number): number => {
	const n = weights.length;
	let low = Number.POSITIVE_INFINITY;
	let high = Number.NEGATIVE_INFINITY;
	for (let mask = 0; mask < 1 << (n - 1); mask++) {
		let cuts = 0;
		let score = (weights[0] ?? 0) + (weights[n - 1] ?? 0);
		for (let i = 0; i < n - 1; i++)
			if ((mask >> i) & 1) {
				cuts++;
				score += (weights[i] ?? 0) + (weights[i + 1] ?? 0);
			}
		if (cuts !== k - 1) continue;
		low = Math.min(low, score);
		high = Math.max(high, score);
	}
	return high - low;
};

describe("2551. Put Marbles in Bags", () => {
	it("solves the examples from the problem statement", () => {
		expect(putMarblesInBags([1, 3, 5, 1], 2)).toBe(4);
		expect(putMarblesInBags([1, 3], 2)).toBe(0);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(2551);
		for (let run = 0; run < 300; run++) {
			const weights = random.array(random.int(1, 10), 1, 20);
			const k = random.int(1, weights.length);
			expect(putMarblesInBags(weights, k)).toBe(byBruteForce(weights, k));
		}
	});
});
