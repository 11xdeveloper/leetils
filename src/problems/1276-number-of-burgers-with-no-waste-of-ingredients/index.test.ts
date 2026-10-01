import { describe, expect, it } from "bun:test";
import { numberOfBurgersWithNoWasteOfIngredients as numOfBurgers } from ".";

/** Tries every number of jumbo burgers. */
const byBruteForce = (tomato: number, cheese: number): number[] => {
	for (let jumbo = 0; jumbo <= cheese; jumbo++) {
		const small = cheese - jumbo;
		if (4 * jumbo + 2 * small === tomato) return [jumbo, small];
	}
	return [];
};

describe("1276. Number of Burgers with No Waste of Ingredients", () => {
	it("solves the examples from the problem statement", () => {
		expect(numOfBurgers(16, 7)).toEqual([1, 6]);
		expect(numOfBurgers(17, 4)).toEqual([]);
		expect(numOfBurgers(4, 17)).toEqual([]);
	});

	it("handles no ingredients and the largest amounts", () => {
		expect(numOfBurgers(0, 0)).toEqual([0, 0]);
		expect(numOfBurgers(10 ** 7, 3 * 10 ** 6)).toEqual([2 * 10 ** 6, 10 ** 6]);
	});

	it("matches trying every split up to 40 slices", () => {
		for (let tomato = 0; tomato <= 40; tomato++) {
			for (let cheese = 0; cheese <= 40; cheese++) {
				expect(numOfBurgers(tomato, cheese)).toEqual(
					byBruteForce(tomato, cheese),
				);
			}
		}
	});
});
