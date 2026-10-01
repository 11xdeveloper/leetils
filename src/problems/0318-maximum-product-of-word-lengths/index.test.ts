import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumProductOfWordLengths as maxProduct } from ".";

const byBruteForce = (words: string[]): number => {
	let best = 0;
	for (const [i, a] of words.entries()) {
		for (const b of words.slice(i + 1)) {
			if (![...a].some((char) => b.includes(char)))
				best = Math.max(best, a.length * b.length);
		}
	}
	return best;
};

describe("318. Maximum Product of Word Lengths", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProduct(["abcw", "baz", "foo", "bar", "xtfn", "abcdef"])).toBe(
			16,
		);
		expect(maxProduct(["a", "ab", "abc", "d", "cd", "bcd", "abcd"])).toBe(4);
		expect(maxProduct(["a", "aa", "aaa", "aaaa"])).toBe(0);
	});

	it("uses letters at both ends of the alphabet", () => {
		expect(maxProduct(["az", "by", "za"])).toBe(4);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(318);
		for (let run = 0; run < 500; run++) {
			const words = Array.from({ length: random.int(2, 10) }, () =>
				random.string(random.int(1, 5), "abcdez"),
			);
			expect(maxProduct(words)).toBe(byBruteForce(words));
		}
	});
});
