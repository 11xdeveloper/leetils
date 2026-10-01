import { describe, expect, it } from "bun:test";
import { removeStonesToMinimizeTheTotal as minStoneSum } from ".";

describe("1962. Remove Stones to Minimize the Total", () => {
	it("solves the examples from the problem statement", () => {
		expect(minStoneSum([5, 4, 9], 2)).toBe(12);
		expect(minStoneSum([4, 3, 6, 7], 3)).toBe(12);
	});
});
