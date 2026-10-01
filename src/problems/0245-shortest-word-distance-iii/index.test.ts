import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestWordDistanceIII } from ".";

const WORDS = ["practice", "makes", "perfect", "coding", "makes"];

const byBruteForce = (words: string[], a: string, b: string): number => {
	let shortest = Number.POSITIVE_INFINITY;
	for (const [i, x] of words.entries()) {
		for (const [j, y] of words.entries()) {
			if (i !== j && x === a && y === b)
				shortest = Math.min(shortest, Math.abs(i - j));
		}
	}
	return shortest;
};

describe("245. Shortest Word Distance III", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestWordDistanceIII(WORDS, "makes", "coding")).toBe(1);
		expect(shortestWordDistanceIII(WORDS, "makes", "makes")).toBe(3);
	});

	it("matches checking every pair of positions on random inputs", () => {
		const random = createRandom(245);
		for (let run = 0; run < 1000; run++) {
			const words = Array.from(
				{ length: random.int(2, 12) },
				() => ["a", "b", "c"][random.int(0, 2)] ?? "a",
			);
			const a = words[random.int(0, words.length - 1)] ?? "a";
			const b = words[random.int(0, words.length - 1)] ?? "a";
			if (a === b && words.filter((w) => w === a).length < 2) continue;
			expect(shortestWordDistanceIII(words, a, b)).toBe(
				byBruteForce(words, a, b),
			);
		}
	});
});
