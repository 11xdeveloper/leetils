import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheLexicographicallySmallestValidSequence as validSequence } from ".";

/** Tries index sequences in lexicographic order. */
const byBruteForce = (word1: string, word2: string): number[] => {
	const m = word2.length;
	const search = (
		start: number,
		picked: number[],
		changes: number,
	): number[] | undefined => {
		if (picked.length === m) return picked;
		for (let i = start; i < word1.length; i++) {
			const cost = word1[i] === word2[picked.length] ? 0 : 1;
			if (changes + cost > 1) continue;
			const found = search(i + 1, [...picked, i], changes + cost);
			if (found) return found;
		}
		return undefined;
	};
	return search(0, [], 0) ?? [];
};

describe("3302. Find the Lexicographically Smallest Valid Sequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(validSequence("vbcca", "abc")).toEqual([0, 1, 2]);
		expect(validSequence("bacdc", "abc")).toEqual([1, 2, 4]);
		expect(validSequence("aaaaaa", "aaabc")).toEqual([]);
		expect(validSequence("abc", "ab")).toEqual([0, 1]);
	});

	it("matches searching in order on random words", () => {
		const random = createRandom(3302);
		for (let run = 0; run < 300; run++) {
			const word1 = random.string(random.int(2, 10), "abc");
			const word2 = random.string(
				random.int(1, Math.min(4, word1.length - 1)),
				"abc",
			);
			expect(validSequence(word1, word2)).toEqual(byBruteForce(word1, word2));
		}
	});
});
