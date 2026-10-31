import { describe, expect, it } from "bun:test";
import { numberOfWaysToBuildHouseOfCards as houseOfCards } from ".";

describe("2189. Number of Ways to Build House of Cards", () => {
	it("solves the examples from the problem statement", () => {
		expect(houseOfCards(16)).toBe(2);
		expect(houseOfCards(2)).toBe(1);
		expect(houseOfCards(4)).toBe(0);
	});
});
