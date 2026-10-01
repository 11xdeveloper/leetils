import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { wordLadderII } from "../0126-word-ladder-ii";
import { wordLadder } from ".";

describe("127. Word Ladder", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			wordLadder("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]),
		).toBe(5);
		expect(wordLadder("hit", "cog", ["hot", "dot", "dog", "lot", "log"])).toBe(
			0,
		);
	});

	it("counts both ends of a one-step sequence", () => {
		expect(wordLadder("a", "c", ["a", "b", "c"])).toBe(2);
	});

	it("matches the sequences from Word Ladder II on random word lists", () => {
		const random = createRandom(127);
		for (let run = 0; run < 500; run++) {
			const words = Array.from({ length: random.int(1, 15) }, () =>
				random.string(3, "abc"),
			);
			const begin = random.string(3, "abc");
			const end = words[random.int(0, words.length - 1)] ?? "";
			if (begin === end) continue;
			const sequences = wordLadderII(begin, end, words);
			expect(wordLadder(begin, end, words)).toBe(sequences[0]?.length ?? 0);
		}
	});
});
