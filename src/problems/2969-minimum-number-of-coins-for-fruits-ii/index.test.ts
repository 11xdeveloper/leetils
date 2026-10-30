import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfCoinsForFruits } from "../2944-minimum-number-of-coins-for-fruits";
import { minimumNumberOfCoinsForFruitsII as minimumCoins } from ".";

describe("2969. Minimum Number of Coins for Fruits II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCoins([3, 1, 2])).toBe(4);
		expect(minimumCoins([1, 10, 1, 1])).toBe(2);
		expect(minimumCoins([26, 18, 6, 12, 49, 7, 45, 45])).toBe(39);
	});

	it("matches the quadratic version on random inputs", () => {
		const random = createRandom(2969);
		for (let run = 0; run < 300; run++) {
			const prices = random.array(random.int(1, 20), 1, 30);
			expect(minimumCoins(prices)).toBe(minimumNumberOfCoinsForFruits(prices));
		}
	});
});
