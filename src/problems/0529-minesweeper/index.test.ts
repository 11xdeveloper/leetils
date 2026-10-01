import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minesweeper as updateBoard } from ".";

/** A direct recursive version of the rules. */
const byRecursion = (
	board: string[][],
	[row = 0, col = 0]: number[],
): string[][] => {
	const reveal = (r: number, c: number): void => {
		const cells = board[r];
		if (cells?.[c] !== "E") return;
		let mines = 0;
		for (let dr = -1; dr <= 1; dr++)
			for (let dc = -1; dc <= 1; dc++)
				if (board[r + dr]?.[c + dc] === "M") mines++;
		cells[c] = mines > 0 ? String(mines) : "B";
		if (mines === 0)
			for (let dr = -1; dr <= 1; dr++)
				for (let dc = -1; dc <= 1; dc++) reveal(r + dr, c + dc);
	};
	const cells = board[row];
	if (cells?.[col] === "M") cells[col] = "X";
	else reveal(row, col);
	return board;
};

describe("529. Minesweeper", () => {
	it("solves the examples from the problem statement", () => {
		const board = [
			["E", "E", "E", "E", "E"],
			["E", "E", "M", "E", "E"],
			["E", "E", "E", "E", "E"],
			["E", "E", "E", "E", "E"],
		];
		const afterFirst = [
			["B", "1", "E", "1", "B"],
			["B", "1", "M", "1", "B"],
			["B", "1", "1", "1", "B"],
			["B", "B", "B", "B", "B"],
		];
		expect(updateBoard(board, [3, 0])).toEqual(afterFirst);
		expect(updateBoard(afterFirst, [1, 2])).toEqual([
			["B", "1", "E", "1", "B"],
			["B", "1", "X", "1", "B"],
			["B", "1", "1", "1", "B"],
			["B", "B", "B", "B", "B"],
		]);
	});

	it("matches the recursive rules on random boards", () => {
		const random = createRandom(529);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(1, 7);
			const board = Array.from({ length: random.int(1, 7) }, () =>
				Array.from({ length: cols }, () =>
					random.int(0, 5) === 0 ? "M" : "E",
				),
			);
			const click = [random.int(0, board.length - 1), random.int(0, cols - 1)];
			expect(updateBoard(structuredClone(board), click)).toEqual(
				byRecursion(structuredClone(board), click),
			);
		}
	});
});
