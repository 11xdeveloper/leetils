import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findLongestSelfContainedSubstring as maxSubstringLength } from ".";

/** Checks every proper substring. */
const byBruteForce = (s: string): number => {
	let best = -1;
	for (let i = 0; i < s.length; i++)
		for (let j = i + 1; j <= s.length; j++) {
			if (j - i === s.length) continue;
			const inside = new Set(s.slice(i, j));
			const outside = s.slice(0, i) + s.slice(j);
			if ([...outside].every((c) => !inside.has(c)))
				best = Math.max(best, j - i);
		}
	return best;
};

describe("3104. Find Longest Self-Contained Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSubstringLength("abba")).toBe(2);
		expect(maxSubstringLength("abab")).toBe(-1);
		expect(maxSubstringLength("abacd")).toBe(4);
	});

	it("matches checking every substring on random strings", () => {
		const random = createRandom(3104);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(2, 10), "abcd");
			expect(maxSubstringLength(s)).toBe(byBruteForce(s));
		}
	});
});
