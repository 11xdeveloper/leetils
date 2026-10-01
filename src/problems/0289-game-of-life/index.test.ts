import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { gameOfLife } from ".";

/** Builds the next generation on a separate board. */
const byCopying = (board: number[][]): number[][] =>
	board.map((row, r) =>
		row.map((cell, c) => {
			let live = 0;
			for (let dr = -1; dr <= 1; dr++) {
				for (let dc = -1; dc <= 1; dc++) {
					if ((dr !== 0 || dc !== 0) && board[r + dr]?.[c + dc] === 1) live++;
				}
			}
			return live === 3 || (cell === 1 && live === 2) ? 1 : 0;
		}),
	);

describe("289. Game of Life", () => {
	it("solves the examples from the problem statement", () => {
		const board = [
			[0, 1, 0],
			[0, 0, 1],
			[1, 1, 1],
			[0, 0, 0],
		];
		expect(gameOfLife(board)).toBeUndefined();
		expect(board).toEqual([
			[0, 0, 0],
			[1, 0, 1],
			[0, 1, 1],
			[0, 1, 0],
		]);
		const square = [
			[1, 1],
			[1, 0],
		];
		gameOfLife(square);
		expect(square).toEqual([
			[1, 1],
			[1, 1],
		]);
	});

	it("matches building the next generation separately on random boards", () => {
		const random = createRandom(289);
		for (let run = 0; run < 500; run++) {
			const columns = random.int(1, 8);
			const board = Array.from({ length: random.int(1, 8) }, () =>
				random.array(columns, 0, 1),
			);
			const expected = byCopying(board);
			gameOfLife(board);
			expect(board).toEqual(expected);
		}
	});
});
