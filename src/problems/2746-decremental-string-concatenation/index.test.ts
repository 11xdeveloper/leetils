import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { decrementalStringConcatenation as minimizeConcatenatedLength } from ".";

/** Tries every choice of side. */
const byBruteForce = (words: string[]): number => {
	const join = (x: string, y: string): string =>
		x.at(-1) === y.charAt(0) ? x + y.slice(1) : x + y;
	let strings = [words[0] ?? ""];
	for (const word of words.slice(1))
		strings = strings.flatMap((s) => [join(s, word), join(word, s)]);
	return Math.min(...strings.map((s) => s.length));
};

describe("2746. Decremental String Concatenation", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimizeConcatenatedLength(["aa", "ab", "bc"])).toBe(4);
		expect(minimizeConcatenatedLength(["ab", "b"])).toBe(2);
		expect(minimizeConcatenatedLength(["aaa", "c", "aba"])).toBe(6);
	});

	it("matches trying every side on random words", () => {
		const random = createRandom(2746);
		for (let run = 0; run < 200; run++) {
			const words = Array.from({ length: random.int(1, 8) }, () =>
				random.string(random.int(1, 3), "abc"),
			);
			expect(minimizeConcatenatedLength(words)).toBe(byBruteForce(words));
		}
	});
});
