import { describe, expect, it } from "bun:test";
import { maximumKToSortAPermutation as sortPermutation } from ".";

describe("3644. Maximum K to Sort a Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortPermutation([0, 3, 2, 1])).toBe(1);
		expect(sortPermutation([0, 1, 3, 2])).toBe(2);
		expect(sortPermutation([3, 2, 1, 0])).toBe(0);
	});

	it("returns 0 for a sorted permutation", () => {
		expect(sortPermutation([0, 1, 2])).toBe(0);
	});
});
