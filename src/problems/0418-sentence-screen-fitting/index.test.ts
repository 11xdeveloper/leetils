import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sentenceScreenFitting } from ".";

/** Fills the screen word by word. */
const bySimulation = (
	sentence: string[],
	rows: number,
	cols: number,
): number => {
	let word = 0;
	let count = 0;
	for (let row = 0; row < rows; row++) {
		let used = 0;
		while (used + (sentence[word]?.length ?? 0) <= cols) {
			used += (sentence[word]?.length ?? 0) + 1;
			word++;
			if (word === sentence.length) {
				word = 0;
				count++;
			}
		}
	}
	return count;
};

describe("418. Sentence Screen Fitting", () => {
	it("solves the examples from the problem statement", () => {
		expect(sentenceScreenFitting(["hello", "world"], 2, 8)).toBe(1);
		expect(sentenceScreenFitting(["a", "bcd", "e"], 3, 6)).toBe(2);
		expect(sentenceScreenFitting(["i", "had", "apple", "pie"], 4, 5)).toBe(1);
	});

	it("returns 0 when a word is wider than the screen", () => {
		expect(sentenceScreenFitting(["toolong"], 5, 3)).toBe(0);
	});

	it("matches filling the screen word by word on random inputs", () => {
		const random = createRandom(418);
		for (let run = 0; run < 1000; run++) {
			const sentence = Array.from({ length: random.int(1, 5) }, () =>
				random.string(random.int(1, 5), "ab"),
			);
			const rows = random.int(1, 20);
			const cols = random.int(1, 15);
			expect(sentenceScreenFitting(sentence, rows, cols)).toBe(
				bySimulation(sentence, rows, cols),
			);
		}
	});
});
