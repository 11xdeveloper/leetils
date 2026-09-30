import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubstringsWithOnlyOneDistinctLetter as countLetters } from ".";

/** Checks every substring. */
const byBruteForce = (s: string): number => {
	let count = 0;
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length; j++) {
			if (new Set(s.slice(i, j)).size === 1) count++;
		}
	}
	return count;
};

describe("1180. Count Substrings with Only One Distinct Letter", () => {
	it("solves the examples from the problem statement", () => {
		expect(countLetters("aaaba")).toBe(8);
		expect(countLetters("aaaaaaaaaa")).toBe(55);
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(1180);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 15), "ab");
			expect(countLetters(s)).toBe(byBruteForce(s));
		}
	});
});
