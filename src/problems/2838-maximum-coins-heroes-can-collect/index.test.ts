import { describe, expect, it } from "bun:test";
import { maximumCoinsHeroesCanCollect as maximumCoins } from ".";

describe("2838. Maximum Coins Heroes Can Collect", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumCoins([1, 4, 2], [1, 1, 5, 2, 3], [2, 3, 4, 5, 6])).toEqual([
			5, 16, 10,
		]);
		expect(maximumCoins([5], [2, 3, 1, 2], [10, 6, 5, 2])).toEqual([23]);
		expect(maximumCoins([4, 4], [5, 7, 8], [1, 1, 1])).toEqual([0, 0]);
	});
});
