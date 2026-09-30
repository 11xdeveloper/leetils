import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfValidWordsForEachPuzzle as findNumOfValidWords } from ".";

/** Checks every word against every puzzle. */
const byBruteForce = (words: string[], puzzles: string[]): number[] =>
	puzzles.map(
		(puzzle) =>
			words.filter(
				(word) =>
					word.includes(puzzle[0] ?? "") &&
					[...word].every((char) => puzzle.includes(char)),
			).length,
	);

describe("1178. Number of Valid Words for Each Puzzle", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findNumOfValidWords(
				["aaaa", "asas", "able", "ability", "actt", "actor", "access"],
				["aboveyz", "abrodyz", "abslute", "absoryz", "actresz", "gaswxyz"],
			),
		).toEqual([1, 1, 3, 2, 4, 0]);
		expect(
			findNumOfValidWords(
				["apple", "pleas", "please"],
				["aelwxyz", "aelpxyz", "aelpsxy", "saelpxy", "xaelpsy"],
			),
		).toEqual([0, 1, 3, 2, 0]);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1178);
		const letters = "abcdefghij";
		for (let run = 0; run < 200; run++) {
			const words = Array.from({ length: random.int(1, 15) }, () =>
				random.string(random.int(4, 8), letters.slice(0, random.int(2, 10))),
			);
			const puzzles = Array.from({ length: random.int(1, 5) }, () =>
				[...letters]
					.sort(() => random.next() - 0.5)
					.slice(0, 7)
					.join(""),
			);
			expect(findNumOfValidWords(words, puzzles)).toEqual(
				byBruteForce(words, puzzles),
			);
		}
	});
});
