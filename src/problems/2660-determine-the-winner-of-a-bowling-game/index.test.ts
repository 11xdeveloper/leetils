import { describe, expect, it } from "bun:test";
import { determineTheWinnerOfABowlingGame as isWinner } from ".";

describe("2660. Determine the Winner of a Bowling Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(isWinner([4, 10, 7, 9], [6, 5, 2, 3])).toBe(1);
		expect(isWinner([3, 5, 7, 6], [8, 10, 10, 2])).toBe(2);
		expect(isWinner([2, 3], [4, 1])).toBe(0);
	});
});
