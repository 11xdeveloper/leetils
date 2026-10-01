import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { wordBreak } from "../0139-word-break";
import { wordBreakII } from ".";

/** Tries every word as the next piece. */
const byRecursion = (s: string, words: string[]): string[] =>
	s === ""
		? [""]
		: [...new Set(words)].flatMap((word) =>
				s.startsWith(word)
					? byRecursion(s.slice(word.length), words).map((rest) =>
							rest === "" ? word : `${word} ${rest}`,
						)
					: [],
			);

describe("140. Word Break II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			wordBreakII("catsanddog", [
				"cat",
				"cats",
				"and",
				"sand",
				"dog",
			]).toSorted(),
		).toEqual(["cat sand dog", "cats and dog"]);
		expect(
			wordBreakII("pineapplepenapple", [
				"apple",
				"pen",
				"applepen",
				"pine",
				"pineapple",
			]).toSorted(),
		).toEqual([
			"pine apple pen apple",
			"pine applepen apple",
			"pineapple pen apple",
		]);
		expect(
			wordBreakII("catsandog", ["cats", "dog", "sand", "and", "cat"]),
		).toEqual([]);
	});

	it("matches trying every word on random inputs, and agrees with Word Break", () => {
		const random = createRandom(140);
		for (let run = 0; run < 500; run++) {
			const words = Array.from({ length: random.int(1, 4) }, () =>
				random.string(random.int(1, 3), "ab"),
			);
			const s = random.string(random.int(1, 10), "ab");
			const sentences = wordBreakII(s, words);
			expect(sentences.toSorted()).toEqual(byRecursion(s, words).toSorted());
			expect(sentences.length > 0).toBe(wordBreak(s, words));
		}
	});
});
