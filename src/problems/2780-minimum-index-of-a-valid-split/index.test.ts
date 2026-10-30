import { describe, expect, it } from "bun:test";
import { minimumIndexOfAValidSplit as minimumIndex } from ".";

describe("2780. Minimum Index of a Valid Split", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumIndex([1, 2, 2, 2])).toBe(2);
		expect(minimumIndex([2, 1, 3, 1, 1, 1, 7, 1, 2, 1])).toBe(4);
		expect(minimumIndex([3, 3, 3, 3, 7, 2, 2])).toBe(-1);
	});
});
