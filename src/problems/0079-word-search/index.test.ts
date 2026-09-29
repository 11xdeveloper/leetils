import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { wordSearch } from ".";

const BOARD = [
	["A", "B", "C", "E"],
	["S", "F", "C", "S"],
	["A", "D", "E", "E"],
];

/** Lists every word that some path on the board spells, up to `maxLength`. */
const allPathWords = (board: string[][], maxLength: number): Set<string> => {
	const words = new Set<string>();
	const rows = board.length;
	const columns = board[0]?.length ?? 0;
	const walk = (r: number, c: number, prefix: string, seen: Set<string>) => {
		const key = `${r},${c}`;
		if (r < 0 || r >= rows || c < 0 || c >= columns || seen.has(key)) return;
		const word = prefix + (board[r]?.[c] ?? "");
		words.add(word);
		if (word.length === maxLength) return;
		const next = new Set(seen).add(key);
		walk(r + 1, c, word, next);
		walk(r - 1, c, word, next);
		walk(r, c + 1, word, next);
		walk(r, c - 1, word, next);
	};
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) walk(r, c, "", new Set());
	}
	return words;
};

describe("79. Word Search", () => {
	it("solves the examples from the problem statement", () => {
		expect(wordSearch(BOARD, "ABCCED")).toBeTrue();
		expect(wordSearch(BOARD, "SEE")).toBeTrue();
		expect(wordSearch(BOARD, "ABCB")).toBeFalse();
	});

	it("does not reuse a cell", () => {
		expect(wordSearch([["a", "a"]], "aaa")).toBeFalse();
		expect(wordSearch([["a"]], "a")).toBeTrue();
	});

	it("finds words spelled backwards from the rarer end", () => {
		expect(wordSearch([["a", "a", "a", "b"]], "baaa")).toBeTrue();
		expect(wordSearch([["a", "a", "a", "b"]], "aaab")).toBeTrue();
	});

	it("is case-sensitive", () => {
		expect(wordSearch([["a", "B"]], "ab")).toBeFalse();
	});

	it("matches listing every path on random boards", () => {
		const random = createRandom(79);
		for (let run = 0; run < 60; run++) {
			const columns = random.int(1, 4);
			const board = Array.from({ length: random.int(1, 3) }, () =>
				random.string(columns, "ab").split(""),
			);
			const spelled = allPathWords(board, 5);
			for (let length = 1; length <= 5; length++) {
				for (let i = 0; i < 10; i++) {
					const word = random.string(length, "ab");
					expect(wordSearch(board, word)).toBe(spelled.has(word));
				}
			}
		}
	});
});
