import { describe, expect, it } from "bun:test";
import { checkIfItIsPossibleToSplitArray as canSplitArray } from ".";

describe("2811. Check if it is Possible to Split Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(canSplitArray([2, 2, 1], 4)).toBe(true);
		expect(canSplitArray([2, 1, 3], 5)).toBe(false);
		expect(canSplitArray([2, 3, 3, 2, 3], 6)).toBe(true);
	});
});
