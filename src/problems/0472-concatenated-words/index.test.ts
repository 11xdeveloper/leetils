import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { concatenatedWords as findAllConcatenatedWordsInADict } from ".";

/** Whether word splits into two or more pieces from words, trying every split. */
const byBruteForce = (words: string[]): string[] => {
	const dictionary = new Set(words);
	const pieces = (word: string): number => {
		if (word === "") return 0;
		let best = Number.NEGATIVE_INFINITY;
		for (let k = 1; k <= word.length; k++) {
			if (dictionary.has(word.slice(0, k)))
				best = Math.max(best, 1 + pieces(word.slice(k)));
		}
		return best;
	};
	return words.filter((word) => pieces(word) >= 2);
};

describe("472. Concatenated Words", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findAllConcatenatedWordsInADict([
				"cat",
				"cats",
				"catsdogcats",
				"dog",
				"dogcatsdog",
				"hippopotamuses",
				"rat",
				"ratcatdogcat",
			]),
		).toEqual(["catsdogcats", "dogcatsdog", "ratcatdogcat"]);
		expect(findAllConcatenatedWordsInADict(["cat", "dog", "catdog"])).toEqual([
			"catdog",
		]);
	});

	it("allows the same word to be used more than once", () => {
		expect(findAllConcatenatedWordsInADict(["a", "aa", "aaa"])).toEqual([
			"aa",
			"aaa",
		]);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(472);
		for (let run = 0; run < 500; run++) {
			const words = [
				...new Set(
					Array.from({ length: random.int(1, 10) }, () =>
						random.string(random.int(1, 6), "ab"),
					),
				),
			];
			expect(findAllConcatenatedWordsInADict(words)).toEqual(
				byBruteForce(words),
			);
		}
	});
});
