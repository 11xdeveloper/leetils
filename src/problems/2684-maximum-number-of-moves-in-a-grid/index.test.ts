import { describe, expect, it } from "bun:test";
import { maximumNumberOfMovesInAGrid as maxMoves } from ".";

describe("2684. Maximum Number of Moves in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxMoves([
				[2, 4, 3, 5],
				[5, 4, 9, 3],
				[3, 4, 2, 11],
				[10, 9, 13, 15],
			]),
		).toBe(3);
		expect(
			maxMoves([
				[3, 2, 4],
				[2, 1, 9],
				[1, 1, 7],
			]),
		).toBe(0);
	});
});
