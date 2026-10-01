import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestRepeatingCharacterReplacement as characterReplacement } from ".";

const byBruteForce = (s: string, k: number): number => {
	let best = 0;
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length; j++) {
			const window = s.slice(i, j);
			const most = Math.max(
				...[...new Set(window)].map(
					(c) => [...window].filter((x) => x === c).length,
				),
			);
			if (window.length - most <= k) best = Math.max(best, window.length);
		}
	}
	return best;
};

describe("424. Longest Repeating Character Replacement", () => {
	it("solves the examples from the problem statement", () => {
		expect(characterReplacement("ABAB", 2)).toBe(4);
		expect(characterReplacement("AABABBA", 1)).toBe(4);
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(424);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 15), "ABC");
			const k = random.int(0, 4);
			expect(characterReplacement(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
