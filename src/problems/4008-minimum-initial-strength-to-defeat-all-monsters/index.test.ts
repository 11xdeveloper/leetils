import { describe, expect, it } from "bun:test";
import { minimumInitialStrengthToDefeatAllMonsters as minInitialStrength } from ".";

describe("4008. Minimum Initial Strength to Defeat All Monsters", () => {
	it("solves the examples from the problem statement", () => {
		expect(minInitialStrength([5, 10, 15], [[1, 1, 10]])).toBe(30);
		expect(
			minInitialStrength(
				[5, 10, 15],
				[
					[1, 2, 10],
					[1, 2, 5],
				],
			),
		).toBe(5);
	});
});
