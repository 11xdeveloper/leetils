import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignTicTacToe } from ".";

/** Checks a full board for a line of one player's marks. */
const winner = (board: number[][], n: number): number => {
	const lines = [
		...board,
		...Array.from({ length: n }, (_, c) => board.map((row) => row[c] ?? 0)),
		board.map((row, i) => row[i] ?? 0),
		board.map((row, i) => row[n - 1 - i] ?? 0),
	];
	for (const line of lines) {
		if (line.every((cell) => cell === 1)) return 1;
		if (line.every((cell) => cell === 2)) return 2;
	}
	return 0;
};

describe("348. Design Tic-Tac-Toe", () => {
	it("solves the example from the problem statement", () => {
		const game = new DesignTicTacToe(3);
		const moves = [
			[0, 0, 1],
			[0, 2, 2],
			[2, 2, 1],
			[1, 1, 2],
			[2, 0, 1],
			[1, 0, 2],
			[2, 1, 1],
		];
		expect(moves.map(([r = 0, c = 0, p = 1]) => game.move(r, c, p))).toEqual([
			0, 0, 0, 0, 0, 0, 1,
		]);
	});

	it("matches checking the whole board after every move on random games", () => {
		const random = createRandom(348);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 5);
			const game = new DesignTicTacToe(n);
			const board = Array.from({ length: n }, () =>
				new Array<number>(n).fill(0),
			);
			const cells = Array.from({ length: n * n }, (_, i) => i).toSorted(
				() => random.next() - 0.5,
			);
			for (const [turn, cell] of cells.entries()) {
				const [r, c, player] = [Math.floor(cell / n), cell % n, (turn % 2) + 1];
				const row = board[r];
				if (row) row[c] = player;
				const result = game.move(r, c, player);
				expect(result).toBe(winner(board, n));
				if (result !== 0) break;
			}
		}
	});
});
