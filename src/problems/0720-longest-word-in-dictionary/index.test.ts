import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestWordInDictionary as longestWord } from ".";

describe("720. Longest Word in Dictionary", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestWord(["w", "wo", "wor", "worl", "world"])).toBe("world");
		expect(
			longestWord(["a", "banana", "app", "appl", "ap", "apply", "apple"]),
		).toBe("apple");
	});

	it("matches checking every prefix of every word on random inputs", () => {
		const random = createRandom(720);
		for (let run = 0; run < 1000; run++) {
			const words = [
				...new Set(
					Array.from({ length: random.int(1, 12) }, () =>
						random.string(random.int(1, 4), "ab"),
					),
				),
			];
			const set = new Set(words);
			const expected =
				words
					.filter((word) =>
						Array.from({ length: word.length }, (_, i) =>
							word.slice(0, i + 1),
						).every((prefix) => set.has(prefix)),
					)
					.sort((a, b) => b.length - a.length || (a < b ? -1 : 1))[0] ?? "";
			expect(longestWord(words)).toBe(expected);
		}
	});
});
