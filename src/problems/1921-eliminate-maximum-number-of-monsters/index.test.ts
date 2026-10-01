import { describe, expect, it } from "bun:test";
import { eliminateMaximumNumberOfMonsters as eliminateMaximum } from ".";

describe("1921. Eliminate Maximum Number of Monsters", () => {
	it("solves the examples from the problem statement", () => {
		expect(eliminateMaximum([1, 3, 4], [1, 1, 1])).toBe(3);
		expect(eliminateMaximum([1, 1, 2, 3], [1, 1, 1, 1])).toBe(1);
		expect(eliminateMaximum([3, 2, 4], [5, 3, 2])).toBe(1);
	});
});
