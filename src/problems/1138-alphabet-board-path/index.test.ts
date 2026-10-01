import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { alphabetBoardPath } from ".";

const board = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"];

/** Follows the moves on the board, failing if they leave it, and returns what was typed. */
const follow = (path: string): string => {
	let [row, column] = [0, 0];
	let typed = "";
	for (const move of path) {
		if (move === "!") typed += board[row]?.[column] ?? "";
		else if (move === "U") row--;
		else if (move === "D") row++;
		else if (move === "L") column--;
		else column++;
		expect(board[row]?.[column]).toBeDefined();
	}
	return typed;
};

/** The fewest moves: each letter's Manhattan distance from the last, plus the presses. */
const shortest = (target: string): number => {
	let [row, column, moves] = [0, 0, 0];
	for (const char of target) {
		const index = char.charCodeAt(0) - 97;
		const [toRow, toColumn] = [Math.floor(index / 5), index % 5];
		moves += Math.abs(toRow - row) + Math.abs(toColumn - column) + 1;
		[row, column] = [toRow, toColumn];
	}
	return moves;
};

describe("1138. Alphabet Board Path", () => {
	it("solves the examples from the problem statement", () => {
		expect(alphabetBoardPath("leet")).toBe("DDR!UURRR!!DDD!");
		expect(alphabetBoardPath("code")).toBe("RR!DDRR!UUL!R!");
	});

	it("gets to and from z without leaving the board", () => {
		for (const target of ["zez", "zzz", "yzy", "azb"]) {
			const path = alphabetBoardPath(target);
			expect(follow(path)).toBe(target);
			expect(path).toHaveLength(shortest(target));
		}
	});

	it("types random targets with as few moves as possible", () => {
		const random = createRandom(1138);
		for (let run = 0; run < 300; run++) {
			const target = random.string(
				random.int(1, 20),
				"abcdefghijklmnopqrstuvwxyz",
			);
			const path = alphabetBoardPath(target);
			expect(follow(path)).toBe(target);
			expect(path).toHaveLength(shortest(target));
		}
	});
});
