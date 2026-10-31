import { describe, expect, it } from "bun:test";
import { minimumMovesToBalanceCircularArray as minMoves } from ".";

describe("3776. Minimum Moves to Balance Circular Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMoves([5, 1, -4])).toBe(4);
		expect(minMoves([1, 2, -5, 2])).toBe(6);
		expect(minMoves([-3, 2])).toBe(-1);
	});

	it("needs nothing without a deficit", () => {
		expect(minMoves([0, 3])).toBe(0);
	});
});
