import { describe, expect, it } from "bun:test";
import { createRandom, stringsUpTo } from "../../testing/random";
import { longestSubsequenceRepeatedKTimes as longestRepeated } from ".";

const isSubsequence = (sub: string, s: string): boolean => {
	let i = 0;
	for (const char of s) if (char === sub[i]) i++;
	return i === sub.length;
};

/** Tries every string over the alphabet, longest and largest first. */
const byBruteForce = (s: string, k: number): string =>
	stringsUpTo(["a", "b", "c"], Math.floor(s.length / k))
		.filter((sub) => isSubsequence(sub.repeat(k), s))
		.reduce((best, sub) =>
			sub.length > best.length || (sub.length === best.length && sub > best)
				? sub
				: best,
		);

describe("2014. Longest Subsequence Repeated k Times", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestRepeated("letsleetcode", 2)).toBe("let");
		expect(longestRepeated("bb", 2)).toBe("b");
		expect(longestRepeated("ab", 2)).toBe("");
	});

	it("matches trying every candidate on random strings", () => {
		const random = createRandom(2014);
		for (let run = 0; run < 200; run++) {
			const k = random.int(2, 4);
			const s = random.string(random.int(k, Math.min(12, 8 * k - 1)), "abc");
			expect(longestRepeated(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
