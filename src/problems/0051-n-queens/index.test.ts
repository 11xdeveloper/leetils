import { describe, expect, it } from "bun:test";
import { nQueens } from ".";

// The number of solutions for n = 1 to 9, from OEIS A000170.
const SOLUTION_COUNTS = [1, 0, 0, 2, 10, 4, 40, 92, 352];

const isValid = (board: string[]): boolean => {
	const queens = board.map((row) => row.indexOf("Q"));
	return queens.every(
		(column, row) =>
			column !== -1 &&
			queens.every(
				(other, otherRow) =>
					otherRow === row ||
					(other !== column &&
						Math.abs(other - column) !== Math.abs(otherRow - row)),
			),
	);
};

describe("51. N-Queens", () => {
	it("solves the examples from the problem statement", () => {
		expect(nQueens(4)).toEqual([
			[".Q..", "...Q", "Q...", "..Q."],
			["..Q.", "Q...", "...Q", ".Q.."],
		]);
		expect(nQueens(1)).toEqual([["Q"]]);
	});

	it("finds no solutions for 2 and 3 queens", () => {
		expect(nQueens(2)).toEqual([]);
		expect(nQueens(3)).toEqual([]);
	});

	it("finds every distinct valid board, up to the constraint of 9 queens", () => {
		for (const [i, count] of SOLUTION_COUNTS.entries()) {
			const n = i + 1;
			const boards = nQueens(n);
			expect(boards).toHaveLength(count);
			expect(new Set(boards.map((board) => board.join("/"))).size).toBe(count);
			for (const board of boards) {
				expect(board).toHaveLength(n);
				expect(board.join("")).toMatch(new RegExp(`^[.Q]{${n * n}}$`));
				expect(isValid(board)).toBeTrue();
			}
		}
	});
});
