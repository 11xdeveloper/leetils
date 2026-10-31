import { describe, expect, it } from "bun:test";
import { maximumNumberOfMovesToKillAllPawns as maxMoves } from ".";

describe("3283. Maximum Number of Moves to Kill All Pawns", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxMoves(1, 1, [[0, 0]])).toBe(4);
		expect(
			maxMoves(0, 2, [
				[1, 1],
				[2, 2],
				[3, 3],
			]),
		).toBe(8);
		expect(
			maxMoves(0, 0, [
				[1, 2],
				[2, 4],
			]),
		).toBe(3);
	});
});
