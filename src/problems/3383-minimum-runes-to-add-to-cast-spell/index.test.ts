import { describe, expect, it } from "bun:test";
import { minimumRunesToAddToCastSpell as minRunesToAdd } from ".";

describe("3383. Minimum Runes to Add to Cast Spell", () => {
	it("solves the examples from the problem statement", () => {
		expect(minRunesToAdd(6, [0], [0, 1, 2, 3], [1, 2, 3, 0])).toBe(2);
		expect(minRunesToAdd(7, [3, 5], [0, 1, 2, 3, 5], [1, 2, 0, 4, 6])).toBe(1);
	});

	it("handles graphs with no edges", () => {
		expect(minRunesToAdd(4, [2], [], [])).toBe(3);
	});
});
