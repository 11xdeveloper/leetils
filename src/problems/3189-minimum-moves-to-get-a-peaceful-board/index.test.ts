import { describe, expect, it } from "bun:test";
import { minimumMovesToGetAPeacefulBoard as minMoves } from ".";

describe("3189. Minimum Moves to Get a Peaceful Board", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minMoves([
				[0, 0],
				[1, 0],
				[1, 1],
			]),
		).toBe(3);
		expect(
			minMoves([
				[0, 0],
				[0, 1],
				[0, 2],
				[0, 3],
			]),
		).toBe(6);
	});
});
