import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestSubstringOfAllVowelsInOrder as longestBeautifulSubstring } from ".";

describe("1839. Longest Substring Of All Vowels in Order", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestBeautifulSubstring("aeiaaioaaaaeiiiiouuuooaauuaeiu")).toBe(
			13,
		);
		expect(longestBeautifulSubstring("aeeeiiiioooauuuaeiou")).toBe(5);
		expect(longestBeautifulSubstring("a")).toBe(0);
	});

	it("matches checking every substring on random strings", () => {
		const random = createRandom(1839);
		for (let run = 0; run < 200; run++) {
			const word = random.string(random.int(1, 20), "aaeeiioouu");
			let best = 0;
			for (let i = 0; i < word.length; i++) {
				for (let j = i + 1; j <= word.length; j++) {
					const sub = word.slice(i, j);
					if (sub === [...sub].sort().join("") && new Set(sub).size === 5)
						best = Math.max(best, sub.length);
				}
			}
			expect(longestBeautifulSubstring(word)).toBe(best);
		}
	});
});
