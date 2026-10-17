import { describe, expect, it } from "bun:test";
import { numberOfValidMoveCombinationsOnChessboard as countCombinations } from ".";

describe("2056. Number of Valid Move Combinations On Chessboard", () => {
	it("solves the examples from the problem statement", () => {
		expect(countCombinations(["rook"], [[1, 1]])).toBe(15);
		expect(countCombinations(["queen"], [[1, 1]])).toBe(22);
		expect(countCombinations(["bishop"], [[4, 3]])).toBe(12);
	});

	it("rules out pieces meeting on the way", () => {
		expect(
			countCombinations(
				["rook", "rook"],
				[
					[1, 1],
					[8, 8],
				],
			),
		).toBe(223);
		expect(
			countCombinations(
				["queen", "bishop"],
				[
					[5, 7],
					[3, 4],
				],
			),
		).toBe(281);
	});
});
