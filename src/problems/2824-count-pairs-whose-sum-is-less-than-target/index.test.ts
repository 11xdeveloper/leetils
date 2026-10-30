import { describe, expect, it } from "bun:test";
import { countPairsWhoseSumIsLessThanTarget as countPairs } from ".";

describe("2824. Count Pairs Whose Sum is Less than Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPairs([-1, 1, 2, 3, 1], 2)).toBe(3);
		expect(countPairs([-6, 2, 5, -2, -7, -1, 3], -2)).toBe(10);
	});
});
