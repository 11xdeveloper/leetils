import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findWinnerOnATicTacToeGame as tictactoe } from ".";

const winnerOf = (board: string[]): string | undefined => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (const [a = 0, b = 0, c = 0] of lines) {
		if (board[a] && board[a] === board[b] && board[b] === board[c])
			return board[a];
	}
	return undefined;
};

describe("1275. Find Winner on a Tic Tac Toe Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			tictactoe([
				[0, 0],
				[2, 0],
				[1, 1],
				[2, 1],
				[2, 2],
			]),
		).toBe("A");
		expect(
			tictactoe([
				[0, 0],
				[1, 1],
				[0, 1],
				[0, 2],
				[1, 0],
				[2, 0],
			]),
		).toBe("B");
		expect(
			tictactoe([
				[0, 0],
				[1, 1],
				[2, 0],
				[1, 0],
				[1, 2],
				[2, 1],
				[0, 1],
				[0, 2],
				[2, 2],
			]),
		).toBe("Draw");
	});

	it("reports a pending game", () => {
		expect(tictactoe([[0, 0]])).toBe("Pending");
	});

	it("matches checking a real board on random valid games", () => {
		const random = createRandom(1275);
		for (let run = 0; run < 500; run++) {
			const order = Array.from({ length: 9 }, (_, i) => i).sort(
				() => random.next() - 0.5,
			);
			const board = new Array<string>(9).fill("");
			const moves: number[][] = [];
			let result = "Draw";
			for (const [i, cell] of order.entries()) {
				board[cell] = i % 2 === 0 ? "A" : "B";
				moves.push([Math.floor(cell / 3), cell % 3]);
				const winner = winnerOf(board);
				if (winner) {
					result = winner;
					break;
				}
				if (i < 8 && random.next() < 0.1) {
					result = "Pending";
					break;
				}
			}
			expect(tictactoe(moves)).toBe(result);
		}
	});
});
