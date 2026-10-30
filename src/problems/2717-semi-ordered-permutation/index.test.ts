import { describe, expect, it } from "bun:test";
import { semiOrderedPermutation } from ".";

describe("2717. Semi-Ordered Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(semiOrderedPermutation([2, 1, 4, 3])).toBe(2);
		expect(semiOrderedPermutation([2, 4, 1, 3])).toBe(3);
		expect(semiOrderedPermutation([1, 3, 4, 2, 5])).toBe(0);
	});
});
