import { describe, expect, it } from "bun:test";
import { maximizeTheTotalHeightOfUniqueTowers as maximumTotalSum } from ".";

describe("3301. Maximize the Total Height of Unique Towers", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumTotalSum([2, 3, 4, 3])).toBe(10);
		expect(maximumTotalSum([15, 10])).toBe(25);
		expect(maximumTotalSum([2, 2, 1])).toBe(-1);
	});
});
