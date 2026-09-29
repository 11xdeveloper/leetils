import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { wordLadderII } from ".";

const differsByOne = (a: string, b: string): boolean =>
	[...a].filter((char, i) => char !== b[i]).length === 1;

/** Finds every simple path by depth-first search, then keeps the shortest. */
const byBruteForce = (
	begin: string,
	end: string,
	words: string[],
): string[][] => {
	const dictionary = [...new Set(words)];
	const paths: string[][] = [];
	const walk = (path: string[]): void => {
		const last = path.at(-1) ?? "";
		if (last === end) {
			paths.push(path);
			return;
		}
		for (const word of dictionary) {
			if (!path.includes(word) && differsByOne(last, word))
				walk([...path, word]);
		}
	};
	walk([begin]);
	const shortest = Math.min(...paths.map((path) => path.length));
	return paths.filter((path) => path.length === shortest);
};

const normalize = (sequences: string[][]): string[] =>
	sequences.map((sequence) => sequence.join(">")).toSorted();

describe("126. Word Ladder II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			normalize(
				wordLadderII("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]),
			),
		).toEqual(
			normalize([
				["hit", "hot", "dot", "dog", "cog"],
				["hit", "hot", "lot", "log", "cog"],
			]),
		);
		expect(
			wordLadderII("hit", "cog", ["hot", "dot", "dog", "lot", "log"]),
		).toEqual([]);
	});

	it("returns a one-step sequence when the words are neighbours", () => {
		expect(wordLadderII("a", "c", ["a", "b", "c"])).toEqual([["a", "c"]]);
	});

	it("records every parent on the previous level", () => {
		expect(normalize(wordLadderII("ab", "cd", ["ad", "cb", "cd"]))).toEqual(
			normalize([
				["ab", "ad", "cd"],
				["ab", "cb", "cd"],
			]),
		);
	});

	it("matches searching every path on random word lists", () => {
		const random = createRandom(126);
		for (let run = 0; run < 150; run++) {
			const words = Array.from({ length: random.int(1, 9) }, () =>
				random.string(3, "abc"),
			);
			const begin = random.string(3, "abc");
			const end = words[random.int(0, words.length - 1)] ?? "";
			if (begin === end) continue;
			expect(normalize(wordLadderII(begin, end, words))).toEqual(
				normalize(byBruteForce(begin, end, words)),
			);
		}
	});
});
