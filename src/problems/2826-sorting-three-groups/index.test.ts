import { describe, expect, it } from "bun:test";
import { sortingThreeGroups as minimumOperations } from ".";

describe("2826. Sorting Three Groups", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumOperations([2, 1, 3, 2, 1])).toBe(3);
		expect(minimumOperations([1, 3, 2, 1, 3, 3])).toBe(2);
		expect(minimumOperations([2, 2, 2, 2, 3, 3])).toBe(0);
	});
});
