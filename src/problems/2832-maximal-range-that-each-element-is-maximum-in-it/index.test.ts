import { describe, expect, it } from "bun:test";
import { maximalRangeThatEachElementIsMaximumInIt as maximumLengthOfRanges } from ".";

describe("2832. Maximal Range That Each Element Is Maximum in It", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumLengthOfRanges([1, 5, 4, 3, 6])).toEqual([1, 4, 2, 1, 5]);
		expect(maximumLengthOfRanges([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
	});
});
