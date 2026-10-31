import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestCommonPrefixOfKStringsAfterRemoval as longestCommonPrefix } from ".";

/** Counts prefixes after each removal. */
const byBruteForce = (words: string[], k: number): number[] =>
	words.map((_, removed) => {
		const counts = new Map<string, number>();
		words.forEach((word, i) => {
			if (i === removed) return;
			for (let l = 1; l <= word.length; l++)
				counts.set(word.slice(0, l), (counts.get(word.slice(0, l)) ?? 0) + 1);
		});
		let best = 0;
		for (const [prefix, count] of counts)
			if (count >= k) best = Math.max(best, prefix.length);
		return best;
	});

describe("3485. Longest Common Prefix of K Strings After Removal", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			longestCommonPrefix(["jump", "run", "run", "jump", "run"], 2),
		).toEqual([3, 4, 4, 3, 4]);
		expect(longestCommonPrefix(["dog", "racer", "car"], 2)).toEqual([0, 0, 0]);
	});

	it("matches counting prefixes on random words", () => {
		const random = createRandom(3485);
		for (let run = 0; run < 200; run++) {
			const words = Array.from({ length: random.int(1, 7) }, () =>
				random.string(random.int(1, 4), "ab"),
			);
			const k = random.int(1, words.length);
			expect(longestCommonPrefix(words, k)).toEqual(byBruteForce(words, k));
		}
	});
});
