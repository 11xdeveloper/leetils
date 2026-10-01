import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { knightProbabilityInChessboard as knightProbability } from ".";

/** Counts the move sequences that stay on the board, out of 8^k. */
const byCounting = (
	n: number,
	k: number,
	row: number,
	column: number,
): number => {
	const moves = [
		[1, 2],
		[2, 1],
		[2, -1],
		[1, -2],
		[-1, -2],
		[-2, -1],
		[-2, 1],
		[-1, 2],
	];
	const count = (r: number, c: number, left: number): number => {
		if (r < 0 || r >= n || c < 0 || c >= n) return 0;
		if (left === 0) return 1;
		return moves.reduce(
			(total, [dr = 0, dc = 0]) => total + count(r + dr, c + dc, left - 1),
			0,
		);
	};
	return count(row, column, k) / 8 ** k;
};

describe("688. Knight Probability in Chessboard", () => {
	it("solves the examples from the problem statement", () => {
		expect(knightProbability(3, 2, 0, 0)).toBeCloseTo(0.0625, 12);
		expect(knightProbability(1, 0, 0, 0)).toBe(1);
	});

	it("matches counting every sequence of moves on random inputs", () => {
		const random = createRandom(688);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 6);
			const k = random.int(0, 4);
			const row = random.int(0, n - 1);
			const column = random.int(0, n - 1);
			expect(knightProbability(n, k, row, column)).toBeCloseTo(
				byCounting(n, k, row, column),
				12,
			);
		}
	});
});
