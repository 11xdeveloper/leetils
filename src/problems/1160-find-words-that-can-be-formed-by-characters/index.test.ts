import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findWordsThatCanBeFormedByCharacters as countCharacters } from ".";

/** Crosses letters off a copy of chars one at a time. */
const byBruteForce = (words: string[], chars: string): number =>
	words
		.filter((word) => {
			const left = [...chars];
			return [...word].every((char) => {
				const i = left.indexOf(char);
				if (i === -1) return false;
				left.splice(i, 1);
				return true;
			});
		})
		.reduce((sum, word) => sum + word.length, 0);

describe("1160. Find Words That Can Be Formed by Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(countCharacters(["cat", "bt", "hat", "tree"], "atach")).toBe(6);
		expect(
			countCharacters(["hello", "world", "leetcode"], "welldonehoneyr"),
		).toBe(10);
	});

	it("matches crossing off letters on random inputs", () => {
		const random = createRandom(1160);
		for (let run = 0; run < 300; run++) {
			const words = Array.from({ length: random.int(1, 6) }, () =>
				random.string(random.int(1, 5), "abcd"),
			);
			const chars = random.string(random.int(1, 8), "abcd");
			expect(countCharacters(words, chars)).toBe(byBruteForce(words, chars));
		}
	});
});
