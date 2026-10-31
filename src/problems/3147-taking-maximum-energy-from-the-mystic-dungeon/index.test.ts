import { describe, expect, it } from "bun:test";
import { takingMaximumEnergyFromTheMysticDungeon as maximumEnergy } from ".";

describe("3147. Taking Maximum Energy From the Mystic Dungeon", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumEnergy([5, 2, -10, -5, 1], 3)).toBe(3);
		expect(maximumEnergy([-2, -3, -1], 2)).toBe(-1);
	});
});
