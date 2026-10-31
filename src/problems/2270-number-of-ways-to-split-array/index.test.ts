import { describe, expect, it } from "bun:test";
import { numberOfWaysToSplitArray as waysToSplitArray } from ".";

describe("2270. Number of Ways to Split Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(waysToSplitArray([10, 4, -8, 7])).toBe(2);
		expect(waysToSplitArray([2, 3, 1, 0])).toBe(2);
	});
});
