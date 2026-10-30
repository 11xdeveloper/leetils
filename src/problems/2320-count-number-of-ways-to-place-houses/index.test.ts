import { describe, expect, it } from "bun:test";
import { countNumberOfWaysToPlaceHouses as countHousePlacements } from ".";

describe("2320. Count Number of Ways to Place Houses", () => {
	it("solves the examples from the problem statement", () => {
		expect(countHousePlacements(1)).toBe(4);
		expect(countHousePlacements(2)).toBe(9);
	});

	it("reduces large counts", () => {
		expect(countHousePlacements(1000)).toBe(500_478_595);
	});
});
