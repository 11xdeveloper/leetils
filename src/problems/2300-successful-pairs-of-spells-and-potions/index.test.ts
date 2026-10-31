import { describe, expect, it } from "bun:test";
import { successfulPairsOfSpellsAndPotions as successfulPairs } from ".";

describe("2300. Successful Pairs of Spells and Potions", () => {
	it("solves the examples from the problem statement", () => {
		expect(successfulPairs([5, 1, 3], [1, 2, 3, 4, 5], 7)).toEqual([4, 0, 3]);
		expect(successfulPairs([3, 1, 2], [8, 5, 8], 16)).toEqual([2, 0, 2]);
	});
});
