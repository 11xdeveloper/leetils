import { describe, expect, it } from "bun:test";
import { validSudoku } from ".";

const parse = (rows: string[]): string[][] => rows.map((row) => row.split(""));

const EXAMPLE = [
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

const withCell = (rows: string[], r: number, c: number, value: string) =>
	parse(
		rows.map((row, i) =>
			i === r ? row.slice(0, c) + value + row.slice(c + 1) : row,
		),
	);

describe("36. Valid Sudoku", () => {
	it("solves the examples from the problem statement", () => {
		expect(validSudoku(parse(EXAMPLE))).toBeTrue();
		expect(validSudoku(withCell(EXAMPLE, 0, 0, "8"))).toBeFalse();
	});

	it("accepts an empty board", () => {
		expect(validSudoku(parse(Array(9).fill(".........")))).toBeTrue();
	});

	it("rejects a digit repeated in a row", () => {
		expect(validSudoku(withCell(EXAMPLE, 0, 8, "5"))).toBeFalse();
	});

	it("rejects a digit repeated in a column", () => {
		expect(validSudoku(withCell(EXAMPLE, 8, 0, "5"))).toBeFalse();
	});

	it("rejects a digit repeated in a box, even when rows and columns are fine", () => {
		expect(validSudoku(withCell(EXAMPLE, 1, 1, "3"))).toBeFalse();
	});

	it("accepts a board that is valid but unsolvable", () => {
		const board = Array(9).fill(".........");
		board[0] = "12345678.";
		board[1] = "........9";
		expect(validSudoku(parse(board))).toBeTrue();
	});
});
