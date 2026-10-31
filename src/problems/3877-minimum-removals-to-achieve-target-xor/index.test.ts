import { describe, expect, it } from "bun:test";
import { minimumRemovalsToAchieveTargetXor as minRemovals } from ".";

describe("3877. Minimum Removals to Achieve Target XOR", () => {
	it("solves the examples from the problem statement", () => {
		expect(minRemovals([1, 2, 3], 2)).toBe(1);
		expect(minRemovals([2, 4], 1)).toBe(-1);
		expect(minRemovals([7], 7)).toBe(0);
	});

	it("can remove everything to reach 0", () => {
		expect(minRemovals([5], 0)).toBe(1);
	});
});
