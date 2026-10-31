import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { inverseCoinChange as findCoins } from ".";

const countWays = (coins: number[], n: number): number[] => {
	const ways = new Array<number>(n + 1).fill(0);
	ways[0] = 1;
	for (const coin of coins)
		for (let t = coin; t <= n; t++)
			ways[t] = (ways[t] ?? 0) + (ways[t - coin] ?? 0);
	return ways.slice(1);
};

describe("3592. Inverse Coin Change", () => {
	it("solves the examples from the problem statement", () => {
		expect(findCoins([0, 1, 0, 2, 0, 3, 0, 4, 0, 5])).toEqual([2, 4, 6]);
		expect(findCoins([1, 2, 2, 3, 4])).toEqual([1, 2, 5]);
		expect(findCoins([1, 2, 3, 4, 15])).toEqual([]);
	});

	it("recovers random sets of coins", () => {
		const random = createRandom(3592);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 20);
			const coins = Array.from({ length: n }, (_, i) => i + 1).filter(
				() => random.int(0, 3) === 0,
			);
			expect(findCoins(countWays(coins, n))).toEqual(coins);
		}
	});
});
