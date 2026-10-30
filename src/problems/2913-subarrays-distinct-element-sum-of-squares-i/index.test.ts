import { describe, expect, it } from "bun:test";
import { subarraysDistinctElementSumOfSquaresI as sumCounts } from ".";

describe("2913. Subarrays Distinct Element Sum of Squares I", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumCounts([1, 2, 1])).toBe(15);
		expect(sumCounts([1, 1])).toBe(3);
	});
});
