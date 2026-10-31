import { describe, expect, it } from "bun:test";
import { minimumRemovalsToBalanceArray as minRemoval } from ".";

describe("3634. Minimum Removals to Balance Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minRemoval([2, 1, 5], 2)).toBe(1);
		expect(minRemoval([1, 6, 2, 9], 3)).toBe(2);
		expect(minRemoval([4, 6], 2)).toBe(0);
	});
});
