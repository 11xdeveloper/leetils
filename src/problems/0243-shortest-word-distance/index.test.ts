import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestWordDistance } from ".";

const WORDS = ["practice", "makes", "perfect", "coding", "makes"];

const byBruteForce = (words: string[], a: string, b: string): number => {
	let shortest = Number.POSITIVE_INFINITY;
	for (const [i, x] of words.entries()) {
		for (const [j, y] of words.entries()) {
			if (x === a && y === b) shortest = Math.min(shortest, Math.abs(i - j));
		}
	}
	return shortest;
};

describe("243. Shortest Word Distance", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestWordDistance(WORDS, "coding", "practice")).toBe(3);
		expect(shortestWordDistance(WORDS, "makes", "coding")).toBe(1);
	});

	it("is symmetric in the two words", () => {
		expect(shortestWordDistance(WORDS, "practice", "coding")).toBe(3);
	});

	it("matches checking every pair of positions on random inputs", () => {
		const random = createRandom(243);
		for (let run = 0; run < 500; run++) {
			const words = Array.from(
				{ length: random.int(2, 15) },
				() => ["a", "b", "c"][random.int(0, 2)] ?? "c",
			);
			// Both words must appear, at different positions.
			const i = random.int(0, words.length - 1);
			const j = (i + random.int(1, words.length - 1)) % words.length;
			words[i] = "a";
			words[j] = "b";
			expect(shortestWordDistance(words, "a", "b")).toBe(
				byBruteForce(words, "a", "b"),
			);
		}
	});
});
