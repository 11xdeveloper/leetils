import { describe, expect, it } from "bun:test";
import { minimumNumberOfCoinsForFruits as minimumCoins } from ".";

describe("2944. Minimum Number of Coins for Fruits", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCoins([3, 1, 2])).toBe(4);
		expect(minimumCoins([1, 10, 1, 1])).toBe(2);
		expect(minimumCoins([26, 18, 6, 12, 49, 7, 45, 45])).toBe(39);
	});
});
