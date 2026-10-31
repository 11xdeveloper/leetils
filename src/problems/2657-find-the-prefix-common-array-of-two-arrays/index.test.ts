import { describe, expect, it } from "bun:test";
import { findThePrefixCommonArrayOfTwoArrays as findThePrefixCommonArray } from ".";

describe("2657. Find the Prefix Common Array of Two Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(findThePrefixCommonArray([1, 3, 2, 4], [3, 1, 2, 4])).toEqual([
			0, 2, 3, 4,
		]);
		expect(findThePrefixCommonArray([2, 3, 1], [3, 1, 2])).toEqual([0, 1, 3]);
	});
});
