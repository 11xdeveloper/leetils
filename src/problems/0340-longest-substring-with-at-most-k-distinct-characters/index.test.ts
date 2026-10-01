import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestSubstringWithAtMostTwoDistinctCharacters } from "../0159-longest-substring-with-at-most-two-distinct-characters";
import { longestSubstringWithAtMostKDistinctCharacters as longest } from ".";

const byBruteForce = (s: string, k: number): number => {
	let best = 0;
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length; j++)
			if (new Set(s.slice(i, j)).size <= k) best = Math.max(best, j - i);
	}
	return best;
};

describe("340. Longest Substring with At Most K Distinct Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(longest("eceba", 2)).toBe(3);
		expect(longest("aa", 1)).toBe(2);
	});

	it("returns 0 when k is 0", () => {
		expect(longest("abc", 0)).toBe(0);
	});

	it("matches the two-character version when k is 2", () => {
		const random = createRandom(3400);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 20), "abcd");
			expect(longest(s, 2)).toBe(
				longestSubstringWithAtMostTwoDistinctCharacters(s),
			);
		}
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(340);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 15), "abcde");
			const k = random.int(0, 5);
			expect(longest(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
