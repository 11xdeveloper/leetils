import { describe, expect, it } from "bun:test";
import { theKnightsTour as tourOfKnight } from ".";

/** Checks the board is a knight's tour starting at `(r, c)`. */
const isTour = (board: number[][], r: number, c: number): boolean => {
	const cells: [number, number][] = [];
	for (const [i, row] of board.entries())
		for (const [j, step] of row.entries()) cells[step] = [i, j];
	const total = board.length * (board[0]?.length ?? 0);
	if (cells.length !== total || board[r]?.[c] !== 0) return false;
	for (let step = 1; step < total; step++) {
		const [a, b] = cells[step - 1] ?? [0, 0];
		const [x, y] = cells[step] ?? [0, 0];
		if (Math.abs(a - x) * Math.abs(b - y) !== 2) return false;
	}
	return true;
};

describe("2664. The Knight’s Tour", () => {
	it("solves the examples from the problem statement", () => {
		expect(tourOfKnight(1, 1, 0, 0)).toEqual([[0]]);
		expect(isTour(tourOfKnight(3, 4, 0, 0), 0, 0)).toBe(true);
	});

	it("finds tours on larger boards", () => {
		expect(isTour(tourOfKnight(5, 5, 0, 0), 0, 0)).toBe(true);
		expect(isTour(tourOfKnight(5, 5, 2, 2), 2, 2)).toBe(true);
		expect(isTour(tourOfKnight(4, 5, 0, 0), 0, 0)).toBe(true);
	});
});
