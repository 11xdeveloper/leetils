import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { substringWithLargestVariance as largestVariance } from ".";

/** Checks every substring. */
const byBruteForce = (s: string): number => {
	let best = 0;
	for (let i = 0; i < s.length; i++) {
		const counts = new Map<string, number>();
		for (let j = i; j < s.length; j++) {
			const char = s[j] ?? "";
			counts.set(char, (counts.get(char) ?? 0) + 1);
			const values = [...counts.values()];
			best = Math.max(best, Math.max(...values) - Math.min(...values));
		}
	}
	return best;
};

describe("2272. Substring With Largest Variance", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestVariance("aababbb")).toBe(3);
		expect(largestVariance("abcde")).toBe(0);
	});

	it("matches checking every substring on random strings", () => {
		const random = createRandom(2272);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 14), "abc");
			expect(largestVariance(s)).toBe(byBruteForce(s));
		}
	});
});
