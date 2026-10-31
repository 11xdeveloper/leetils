import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumCoinCollection as maxCoins } from ".";

/** Tries every entry, exit and lane plan. */
const byBruteForce = (lane1: number[], lane2: number[]): number => {
	const n = lane1.length;
	let best = Number.NEGATIVE_INFINITY;
	for (let start = 0; start < n; start++)
		for (let end = start; end < n; end++)
			for (let mask = 0; mask < 1 << (end - start + 1); mask++) {
				let switches = 0;
				let lane = 0;
				let total = 0;
				for (let i = start; i <= end; i++) {
					const want = (mask >> (i - start)) & 1;
					if (want !== lane) {
						switches++;
						lane = want;
					}
					total += (lane === 0 ? lane1 : lane2)[i] ?? 0;
				}
				if (switches <= 2) best = Math.max(best, total);
			}
	return best;
};

describe("3466. Maximum Coin Collection", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxCoins([1, -2, -10, 3], [-5, 10, 0, 1])).toBe(14);
		expect(maxCoins([1, -1, -1, -1], [0, 3, 4, -5])).toBe(8);
		expect(maxCoins([-5, -4, -3], [-1, 2, 3])).toBe(5);
		expect(maxCoins([-3, -3, -3], [9, -2, 4])).toBe(11);
		expect(maxCoins([-10], [-2])).toBe(-2);
	});

	it("matches trying every plan on random lanes", () => {
		const random = createRandom(3466);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 7);
			const lane1 = random.array(n, -5, 5);
			const lane2 = random.array(n, -5, 5);
			expect(maxCoins(lane1, lane2)).toBe(byBruteForce(lane1, lane2));
		}
	});
});
