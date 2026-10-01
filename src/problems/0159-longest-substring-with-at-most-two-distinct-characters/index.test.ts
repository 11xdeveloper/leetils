import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestSubstringWithAtMostTwoDistinctCharacters as longest } from ".";

const byBruteForce = (s: string): number => {
	let best = 0;
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length; j++) {
			if (new Set(s.slice(i, j)).size <= 2) best = Math.max(best, j - i);
		}
	}
	return best;
};

describe("159. Longest Substring with At Most Two Distinct Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(longest("eceba")).toBe(3);
		expect(longest("ccaabbb")).toBe(5);
	});

	it("returns the whole length for one or two distinct characters", () => {
		expect(longest("a")).toBe(1);
		expect(longest("abababab")).toBe(8);
	});

	it("is case-sensitive", () => {
		expect(longest("aAb")).toBe(2);
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(159);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 20), "abcA");
			expect(longest(s)).toBe(byBruteForce(s));
		}
	});
});
