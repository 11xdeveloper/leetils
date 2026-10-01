import { describe, expect, it } from "bun:test";
import { validTicTacToeState as validTicTacToe } from ".";

/** Every board reachable by playing the game from the start. */
const reachable = (): Set<string> => {
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
	const won = (cells: string) =>
		lines.some(
			([a = 0, b = 0, c = 0]) =>
				cells.charAt(a) !== " " &&
				cells.charAt(a) === cells.charAt(b) &&
				cells.charAt(b) === cells.charAt(c),
		);
	const boards = new Set<string>();
	const play = (cells: string, player: string): void => {
		if (boards.has(cells)) return;
		boards.add(cells);
		if (won(cells)) return;
		for (let i = 0; i < 9; i++) {
			if (cells.charAt(i) === " ")
				play(
					cells.slice(0, i) + player + cells.slice(i + 1),
					player === "X" ? "O" : "X",
				);
		}
	};
	play(" ".repeat(9), "X");
	return boards;
};

describe("794. Valid Tic-Tac-Toe State", () => {
	it("solves the examples from the problem statement", () => {
		expect(validTicTacToe(["O  ", "   ", "   "])).toBeFalse();
		expect(validTicTacToe(["XOX", " X ", "   "])).toBeFalse();
		expect(validTicTacToe(["XOX", "O O", "XOX"])).toBeTrue();
	});

	it("accepts exactly the boards reachable by playing, across all 3^9 boards", () => {
		const valid = reachable();
		for (let code = 0; code < 3 ** 9; code++) {
			let cells = "";
			for (let rest = code, i = 0; i < 9; i++, rest = Math.floor(rest / 3))
				cells += " XO".charAt(rest % 3);
			expect(
				validTicTacToe([cells.slice(0, 3), cells.slice(3, 6), cells.slice(6)]),
			).toBe(valid.has(cells));
		}
	});
});
