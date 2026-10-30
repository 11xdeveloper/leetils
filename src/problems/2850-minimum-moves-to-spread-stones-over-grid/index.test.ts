import { describe, expect, it } from "bun:test";
import { minimumMovesToSpreadStonesOverGrid as minimumMoves } from ".";

describe("2850. Minimum Moves to Spread Stones Over Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumMoves([
				[1, 1, 0],
				[1, 1, 1],
				[1, 2, 1],
			]),
		).toBe(3);
		expect(
			minimumMoves([
				[1, 3, 0],
				[1, 0, 0],
				[1, 0, 3],
			]),
		).toBe(4);
	});

	it("needs no moves when already spread", () => {
		expect(
			minimumMoves([
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1],
			]),
		).toBe(0);
	});
});
