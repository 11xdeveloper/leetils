import { describe, expect, it } from "bun:test";
import { validSudoku } from "../0036-valid-sudoku";
import { sudokuSolver } from ".";

const solve = (rows: string[]): string[] => {
	const board = rows.map((row) => row.split(""));
	expect(sudokuSolver(board)).toBeUndefined();
	return board.map((row) => row.join(""));
};

/** Checks the solution is complete, valid and keeps every given digit. */
const expectSolved = (puzzle: string[], solution: string[]): void => {
	expect(solution.join("")).not.toContain(".");
	expect(validSudoku(solution.map((row) => row.split("")))).toBeTrue();
	for (const [r, row] of puzzle.entries()) {
		for (const [c, cell] of [...row].entries()) {
			if (cell !== ".") expect(solution[r]?.[c]).toBe(cell);
		}
	}
};

describe("37. Sudoku Solver", () => {
	it("solves the example from the problem statement", () => {
		const puzzle = [
			"53..7....",
			"6..195...",
			".98....6.",
			"8...6...3",
			"4..8.3..1",
			"7...2...6",
			".6....28.",
			"...419..5",
			"....8..79",
		];
		expect(solve(puzzle)).toEqual([
			"534678912",
			"672195348",
			"198342567",
			"859761423",
			"426853791",
			"713924856",
			"961537284",
			"287419635",
			"345286179",
		]);
	});

	it("solves a puzzle that needs deep backtracking", () => {
		// Arto Inkala's "world's hardest Sudoku".
		const puzzle = [
			"8........",
			"..36.....",
			".7..9.2..",
			".5...7...",
			"....457..",
			"...1...3.",
			"..1....68",
			"..85...1.",
			".9....4..",
		];
		expectSolved(puzzle, solve(puzzle));
	});

	it("solves a puzzle with only 17 givens, the fewest possible", () => {
		const puzzle = [
			"...8.1...",
			".......43",
			"5........",
			"....7.8..",
			"......1..",
			".2..3....",
			"6......75",
			"..34.....",
			"...2..6..",
		];
		expectSolved(puzzle, solve(puzzle));
	});

	it("leaves a solved board unchanged", () => {
		const solved = [
			"534678912",
			"672195348",
			"198342567",
			"859761423",
			"426853791",
			"713924856",
			"961537284",
			"287419635",
			"345286179",
		];
		expect(solve(solved)).toEqual(solved);
	});
});
