import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumCoinsFromKConsecutiveBags as maximumCoins } from ".";

/** Tries every window start. */
const byBruteForce = (coins: number[][], k: number): number => {
	const bag = new Map<number, number>();
	for (const [l = 0, r = 0, c = 0] of coins)
		for (let x = l; x <= r; x++) bag.set(x, c);
	let best = 0;
	for (let start = -k; start <= 40; start++) {
		let sum = 0;
		for (let x = start; x < start + k; x++) sum += bag.get(x) ?? 0;
		best = Math.max(best, sum);
	}
	return best;
};

describe("3413. Maximum Coins From K Consecutive Bags", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumCoins(
				[
					[8, 10, 1],
					[1, 3, 2],
					[5, 6, 4],
				],
				4,
			),
		).toBe(10);
		expect(maximumCoins([[1, 10, 3]], 2)).toBe(6);
	});

	it("matches trying every window on random segments", () => {
		const random = createRandom(3413);
		for (let run = 0; run < 300; run++) {
			const coins: number[][] = [];
			for (let at = 1; at < 30 && coins.length < 5; ) {
				const l = at + random.int(0, 3);
				const r = l + random.int(0, 4);
				coins.push([l, r, random.int(1, 5)]);
				at = r + 1;
			}
			const shuffled = coins.sort(() => random.next() - 0.5);
			const k = random.int(1, 10);
			expect(maximumCoins(shuffled, k)).toBe(byBruteForce(shuffled, k));
		}
	});
});
