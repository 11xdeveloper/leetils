import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { wordBreak } from ".";

/** Tries every word as the next piece. */
const byRecursion = (s: string, words: string[]): boolean =>
	s === "" ||
	words.some(
		(word) => s.startsWith(word) && byRecursion(s.slice(word.length), words),
	);

describe("139. Word Break", () => {
	it("solves the examples from the problem statement", () => {
		expect(wordBreak("leetcode", ["leet", "code"])).toBeTrue();
		expect(wordBreak("applepenapple", ["apple", "pen"])).toBeTrue();
		expect(
			wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]),
		).toBeFalse();
	});

	it("stays fast when the obvious splits keep failing", () => {
		const s = `${"a".repeat(300)}b`;
		expect(wordBreak(s, ["a", "aa", "aaa", "aaaa", "aaaaa"])).toBeFalse();
	});

	it("matches trying every word on random inputs", () => {
		const random = createRandom(139);
		for (let run = 0; run < 500; run++) {
			const words = Array.from({ length: random.int(1, 4) }, () =>
				random.string(random.int(1, 3), "ab"),
			);
			const s = random.string(random.int(1, 12), "ab");
			expect(wordBreak(s, words)).toBe(byRecursion(s, words));
		}
	});
});
