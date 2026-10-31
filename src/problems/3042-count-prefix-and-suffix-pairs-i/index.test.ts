import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countPrefixAndSuffixPairsI as countPrefixSuffixPairs } from ".";

/** Checks every pair. */
const byBruteForce = (words: string[]): number => {
	let pairs = 0;
	for (let i = 0; i < words.length; i++)
		for (let j = i + 1; j < words.length; j++) {
			const [a = "", b = ""] = [words[i], words[j]];
			if (b.startsWith(a) && b.endsWith(a)) pairs++;
		}
	return pairs;
};

describe("3042. Count Prefix and Suffix Pairs I", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPrefixSuffixPairs(["a", "aba", "ababa", "aa"])).toBe(4);
		expect(countPrefixSuffixPairs(["pa", "papa", "ma", "mama"])).toBe(2);
		expect(countPrefixSuffixPairs(["abab", "ab"])).toBe(0);
	});

	it("matches checking every pair on random words", () => {
		const random = createRandom(3042);
		for (let run = 0; run < 300; run++) {
			const words = Array.from({ length: random.int(1, 8) }, () =>
				random.string(random.int(1, 5), "ab"),
			);
			expect(countPrefixSuffixPairs(words)).toBe(byBruteForce(words));
		}
	});
});
