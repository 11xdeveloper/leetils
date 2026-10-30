import { describe, expect, it } from "bun:test";
import { minimumNumberOfCoinsToBeAdded as minimumAddedCoins } from ".";

describe("2952. Minimum Number of Coins to be Added", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumAddedCoins([1, 4, 10], 19)).toBe(2);
		expect(minimumAddedCoins([1, 4, 10, 5, 7, 19], 19)).toBe(1);
		expect(minimumAddedCoins([1, 1, 1], 20)).toBe(3);
	});
});
