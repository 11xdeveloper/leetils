import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfMatchingSubsequences as numMatchingSubseq } from ".";

const isSubsequence = (word: string, s: string): boolean => {
	let i = 0;
	for (const char of s) if (char === word.charAt(i)) i++;
	return i === word.length;
};

describe("792. Number of Matching Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(numMatchingSubseq("abcde", ["a", "bb", "acd", "ace"])).toBe(3);
		expect(
			numMatchingSubseq("dsahjpjauf", [
				"ahjpjau",
				"ja",
				"ahbwzgqnuk",
				"tnmlanowax",
			]),
		).toBe(2);
	});

	it("matches checking each word on random inputs, including repeated words", () => {
		const random = createRandom(792);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 15), "abc");
			const words = Array.from({ length: random.int(1, 8) }, () =>
				random.string(random.int(1, 4), "abc"),
			);
			expect(numMatchingSubseq(s, words)).toBe(
				words.filter((word) => isSubsequence(word, s)).length,
			);
		}
	});
});
