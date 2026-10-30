import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lengthOfTheLongestValidSubstring as longestValidSubstring } from ".";

/** Checks every substring. */
const byBruteForce = (word: string, forbidden: string[]): number => {
	let best = 0;
	for (let i = 0; i < word.length; i++)
		for (let j = i + 1; j <= word.length; j++)
			if (!forbidden.some((f) => word.slice(i, j).includes(f)))
				best = Math.max(best, j - i);
	return best;
};

describe("2781. Length of the Longest Valid Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestValidSubstring("cbaaaabc", ["aaa", "cb"])).toBe(4);
		expect(longestValidSubstring("leetcode", ["de", "le", "e"])).toBe(4);
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(2781);
		for (let run = 0; run < 300; run++) {
			const word = random.string(random.int(1, 12), "abc");
			const forbidden = Array.from({ length: random.int(1, 3) }, () =>
				random.string(random.int(1, 3), "abc"),
			);
			expect(longestValidSubstring(word, forbidden)).toBe(
				byBruteForce(word, forbidden),
			);
		}
	});
});
