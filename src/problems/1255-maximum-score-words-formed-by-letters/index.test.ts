import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumScoreWordsFormedByLetters as maxScoreWords } from ".";

/** Tries every subset of words, spelling them by crossing letters off. */
const byBruteForce = (
	words: string[],
	letters: string[],
	score: number[],
): number => {
	let best = 0;
	for (let mask = 0; mask < 2 ** words.length; mask++) {
		const left = [...letters];
		let [fits, value] = [true, 0];
		for (const char of words.filter((_, i) => mask & (1 << i)).join("")) {
			const at = left.indexOf(char);
			if (at === -1) fits = false;
			else left.splice(at, 1);
			value += score[char.charCodeAt(0) - 97] ?? 0;
		}
		if (fits) best = Math.max(best, value);
	}
	return best;
};

const scores = (entries: Record<string, number>) =>
	Array.from(
		{ length: 26 },
		(_, i) => entries[String.fromCharCode(97 + i)] ?? 0,
	);

describe("1255. Maximum Score Words Formed by Letters", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxScoreWords(
				["dog", "cat", "dad", "good"],
				["a", "a", "c", "d", "d", "d", "g", "o", "o"],
				scores({ a: 1, c: 9, d: 5, g: 3, o: 2 }),
			),
		).toBe(23);
		expect(
			maxScoreWords(
				["xxxz", "ax", "bx", "cx"],
				["z", "a", "b", "c", "x", "x", "x"],
				scores({ a: 4, b: 4, c: 4, x: 5, z: 10 }),
			),
		).toBe(27);
		expect(
			maxScoreWords(
				["leetcode"],
				["l", "e", "t", "c", "o", "d"],
				scores({ c: 1, d: 1, e: 1, l: 1, o: 1, t: 1 }),
			),
		).toBe(0);
	});

	it("matches trying every subset on random inputs", () => {
		const random = createRandom(1255);
		for (let run = 0; run < 200; run++) {
			const words = Array.from({ length: random.int(1, 6) }, () =>
				random.string(random.int(1, 4), "abcd"),
			);
			const letters = [...random.string(random.int(1, 10), "abcd")];
			const score = random.array(26, 0, 10);
			expect(maxScoreWords(words, letters, score)).toBe(
				byBruteForce(words, letters, score),
			);
		}
	});
});
