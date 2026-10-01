import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { wordSearch } from "../0079-word-search";
import { wordSearchII } from ".";

const BOARD = [
	["o", "a", "a", "n"],
	["e", "t", "a", "e"],
	["i", "h", "k", "r"],
	["i", "f", "l", "v"],
];

describe("212. Word Search II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			wordSearchII(BOARD, ["oath", "pea", "eat", "rain"]).toSorted(),
		).toEqual(["eat", "oath"]);
		expect(
			wordSearchII(
				[
					["a", "b"],
					["c", "d"],
				],
				["abcb"],
			),
		).toEqual([]);
	});

	it("returns each word once even when it can be spelled many ways", () => {
		expect(wordSearchII([["a", "a"]], ["a"])).toEqual(["a"]);
	});

	it("finds words that are prefixes of other words", () => {
		expect(wordSearchII([["a", "b", "c"]], ["ab", "abc"]).toSorted()).toEqual([
			"ab",
			"abc",
		]);
	});

	it("matches searching for each word with Word Search on random boards", () => {
		const random = createRandom(212);
		for (let run = 0; run < 100; run++) {
			const columns = random.int(1, 4);
			const board = Array.from({ length: random.int(1, 4) }, () =>
				random.string(columns, "abc").split(""),
			);
			const words = [
				...new Set(
					Array.from({ length: random.int(1, 10) }, () =>
						random.string(random.int(1, 5), "abc"),
					),
				),
			];
			expect(wordSearchII(board, words).toSorted()).toEqual(
				words.filter((word) => wordSearch(board, word)).toSorted(),
			);
		}
	});
});
