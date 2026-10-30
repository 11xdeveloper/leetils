import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subsequenceWithTheMinimumScore as minimumScore } from ".";

/** Tries removing every span of `t`. */
const byBruteForce = (s: string, t: string): number => {
	const isSubsequence = (x: string): boolean => {
		let p = 0;
		for (const c of s) if (p < x.length && x.charAt(p) === c) p++;
		return p === x.length;
	};
	if (isSubsequence(t)) return 0;
	let best = t.length;
	for (let left = 0; left < t.length; left++)
		for (let right = left; right < t.length; right++)
			if (isSubsequence(t.slice(0, left) + t.slice(right + 1)))
				best = Math.min(best, right - left + 1);
	return best;
};

describe("2565. Subsequence With the Minimum Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumScore("abacaba", "bzaa")).toBe(1);
		expect(minimumScore("cde", "xyz")).toBe(3);
	});

	it("matches trying every span on random strings", () => {
		const random = createRandom(2565);
		for (let run = 0; run < 400; run++) {
			const s = random.string(random.int(1, 8), "abc");
			const t = random.string(random.int(1, 6), "abcd");
			expect(minimumScore(s, t)).toBe(byBruteForce(s, t));
		}
	});
});
