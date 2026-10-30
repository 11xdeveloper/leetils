import { describe, expect, it } from "bun:test";
import { countWaysToBuildGoodStrings as countGoodStrings } from ".";

describe("2466. Count Ways To Build Good Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(countGoodStrings(3, 3, 1, 1)).toBe(8);
		expect(countGoodStrings(2, 3, 1, 2)).toBe(5);
	});
});
