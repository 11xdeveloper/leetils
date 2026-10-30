import { describe, expect, it } from "bun:test";
import { findTheDistinctDifferenceArray as distinctDifferenceArray } from ".";

describe("2670. Find the Distinct Difference Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(distinctDifferenceArray([1, 2, 3, 4, 5])).toEqual([-3, -1, 1, 3, 5]);
		expect(distinctDifferenceArray([3, 2, 3, 4, 2])).toEqual([-2, -1, 0, 2, 3]);
	});
});
