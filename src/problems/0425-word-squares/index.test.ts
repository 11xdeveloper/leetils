import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { validWordSquare } from "../0422-valid-word-square";
import { wordSquares } from ".";

/** Tries every sequence of rows and keeps the valid squares. */
const byBruteForce = (words: string[]): string[] => {
	const size = words[0]?.length ?? 0;
	let sequences: string[][] = [[]];
	for (let row = 0; row < size; row++)
		sequences = sequences.flatMap((s) => words.map((w) => [...s, w]));
	return sequences
		.filter(validWordSquare)
		.map((s) => s.join(","))
		.toSorted();
};

describe("425. Word Squares", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			wordSquares(["area", "lead", "wall", "lady", "ball"])
				.map((s) => s.join(","))
				.toSorted(),
		).toEqual(["ball,area,lead,lady", "wall,area,lead,lady"]);
		expect(
			wordSquares(["abat", "baba", "atan", "atal"])
				.map((s) => s.join(","))
				.toSorted(),
		).toEqual(["baba,abat,baba,atal", "baba,abat,baba,atan"]);
	});

	it("matches trying every sequence of rows on random words", () => {
		const random = createRandom(425);
		for (let run = 0; run < 200; run++) {
			const length = random.int(1, 3);
			const words = [
				...new Set(
					Array.from({ length: random.int(1, 6) }, () =>
						random.string(length, "ab"),
					),
				),
			];
			expect(
				wordSquares(words)
					.map((s) => s.join(","))
					.toSorted(),
			).toEqual(byBruteForce(words));
		}
	});
});
