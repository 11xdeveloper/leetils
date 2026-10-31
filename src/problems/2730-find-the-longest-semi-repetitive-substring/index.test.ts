import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheLongestSemiRepetitiveSubstring as longestSemiRepetitiveSubstring } from ".";

/** Checks every substring. */
const byBruteForce = (s: string): number => {
	let best = 0;
	for (let i = 0; i < s.length; i++)
		for (let j = i; j < s.length; j++) {
			let pairs = 0;
			for (let k = i + 1; k <= j; k++)
				if (s.charAt(k) === s.charAt(k - 1)) pairs++;
			if (pairs <= 1) best = Math.max(best, j - i + 1);
		}
	return best;
};

describe("2730. Find the Longest Semi-Repetitive Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSemiRepetitiveSubstring("52233")).toBe(4);
		expect(longestSemiRepetitiveSubstring("5494")).toBe(4);
		expect(longestSemiRepetitiveSubstring("1111111")).toBe(2);
	});

	it("matches checking every substring on random strings", () => {
		const random = createRandom(2730);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "012");
			expect(longestSemiRepetitiveSubstring(s)).toBe(byBruteForce(s));
		}
	});
});
