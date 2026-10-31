import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { uniqueSubstringsWithEqualDigitFrequency as equalDigitFrequency } from ".";

/** Collects every qualifying substring in a set. */
const byBruteForce = (s: string): number => {
	const found = new Set<string>();
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length; j++) {
			const counts = new Map<string, number>();
			for (const char of s.slice(i, j))
				counts.set(char, (counts.get(char) ?? 0) + 1);
			if (new Set(counts.values()).size === 1) found.add(s.slice(i, j));
		}
	}
	return found.size;
};

describe("2168. Unique Substrings With Equal Digit Frequency", () => {
	it("solves the examples from the problem statement", () => {
		expect(equalDigitFrequency("1212")).toBe(5);
		expect(equalDigitFrequency("12321")).toBe(9);
	});

	it("matches collecting substrings on random strings", () => {
		const random = createRandom(2168);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 15), "0123");
			expect(equalDigitFrequency(s)).toBe(byBruteForce(s));
		}
	});
});
