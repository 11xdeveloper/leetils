import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumWindowSubstring } from ".";

const covers = (window: string, t: string): boolean => {
	const counts = new Map<string, number>();
	for (const char of window) counts.set(char, (counts.get(char) ?? 0) + 1);
	for (const char of t) {
		const count = counts.get(char) ?? 0;
		if (count === 0) return false;
		counts.set(char, count - 1);
	}
	return true;
};

/** Checks every substring, shortest and then leftmost first. */
const byBruteForce = (s: string, t: string): string => {
	for (let length = 1; length <= s.length; length++) {
		for (let start = 0; start + length <= s.length; start++) {
			const window = s.slice(start, start + length);
			if (covers(window, t)) return window;
		}
	}
	return "";
};

describe("76. Minimum Window Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumWindowSubstring("ADOBECODEBANC", "ABC")).toBe("BANC");
		expect(minimumWindowSubstring("a", "a")).toBe("a");
		expect(minimumWindowSubstring("a", "aa")).toBe("");
	});

	it("counts repeated characters in t", () => {
		expect(minimumWindowSubstring("aabdec", "aab")).toBe("aab");
		expect(minimumWindowSubstring("abcab", "abb")).toBe("bcab");
	});

	it("is case-sensitive", () => {
		expect(minimumWindowSubstring("aA", "A")).toBe("A");
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(76);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 15), "abcA");
			const t = random.string(random.int(1, 4), "abcA");
			expect(minimumWindowSubstring(s, t)).toBe(byBruteForce(s, t));
		}
	});
});
