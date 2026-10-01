import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { getEqualSubstringsWithinBudget as equalSubstring } from ".";

/** Prices every substring. */
const byBruteForce = (s: string, t: string, maxCost: number): number => {
	let longest = 0;
	for (let i = 0; i < s.length; i++) {
		let total = 0;
		for (let j = i; j < s.length; j++) {
			total += Math.abs(s.charCodeAt(j) - t.charCodeAt(j));
			if (total <= maxCost) longest = Math.max(longest, j - i + 1);
		}
	}
	return longest;
};

describe("1208. Get Equal Substrings Within Budget", () => {
	it("solves the examples from the problem statement", () => {
		expect(equalSubstring("abcd", "bcdf", 3)).toBe(3);
		expect(equalSubstring("abcd", "cdef", 3)).toBe(1);
		expect(equalSubstring("abcd", "acde", 0)).toBe(1);
	});

	it("returns 0 when every change is over budget", () => {
		expect(equalSubstring("aa", "zz", 5)).toBe(0);
	});

	it("matches pricing every substring on random inputs", () => {
		const random = createRandom(1208);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 12);
			const [s, t] = [random.string(n, "abcdef"), random.string(n, "abcdef")];
			const maxCost = random.int(0, 12);
			expect(equalSubstring(s, t, maxCost)).toBe(byBruteForce(s, t, maxCost));
		}
	});
});
