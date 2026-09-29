import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { coinChangeII as change } from ".";

/** Chooses how many of each coin to use, in turn. */
const byBruteForce = (amount: number, coins: number[]): number => {
	const count = (index: number, left: number): number => {
		if (index === coins.length) return left === 0 ? 1 : 0;
		let ways = 0;
		for (let used = 0; used * (coins[index] ?? 1) <= left; used++)
			ways += count(index + 1, left - used * (coins[index] ?? 1));
		return ways;
	};
	return count(0, amount);
};

describe("518. Coin Change II", () => {
	it("solves the examples from the problem statement", () => {
		expect(change(5, [1, 2, 5])).toBe(4);
		expect(change(3, [2])).toBe(0);
		expect(change(10, [10])).toBe(1);
	});

	it("counts one way to make 0", () => {
		expect(change(0, [7])).toBe(1);
	});

	it("matches choosing counts of each coin on random inputs", () => {
		const random = createRandom(518);
		for (let run = 0; run < 500; run++) {
			const coins = [...new Set(random.array(random.int(1, 4), 1, 8))];
			const amount = random.int(0, 25);
			expect(change(amount, coins)).toBe(byBruteForce(amount, coins));
		}
	});
});
