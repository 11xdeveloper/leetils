import { describe, expect, it } from "bun:test";
import { maximumSplitOfPositiveEvenIntegers as maximumEvenSplit } from ".";

describe("2178. Maximum Split of Positive Even Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumEvenSplit(12)).toEqual([2, 4, 6]);
		expect(maximumEvenSplit(7)).toEqual([]);
		expect(maximumEvenSplit(28)).toEqual([2, 4, 6, 16]);
	});

	it("handles the smallest sum", () => {
		expect(maximumEvenSplit(2)).toEqual([2]);
	});
});
