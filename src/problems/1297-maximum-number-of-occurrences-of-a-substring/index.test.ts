import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfOccurrencesOfASubstring as maxFreq } from ".";

/** Counts every qualifying substring of every allowed length. */
const byBruteForce = (
	s: string,
	maxLetters: number,
	minSize: number,
	maxSize: number,
): number => {
	const counts = new Map<string, number>();
	for (let size = minSize; size <= maxSize; size++) {
		for (let i = 0; i + size <= s.length; i++) {
			const sub = s.slice(i, i + size);
			if (new Set(sub).size <= maxLetters)
				counts.set(sub, (counts.get(sub) ?? 0) + 1);
		}
	}
	return Math.max(0, ...counts.values());
};

describe("1297. Maximum Number of Occurrences of a Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxFreq("aababcaab", 2, 3, 4)).toBe(2);
		expect(maxFreq("aaaa", 1, 3, 3)).toBe(2);
	});

	it("returns 0 when no substring qualifies", () => {
		expect(maxFreq("abc", 1, 2, 3)).toBe(0);
	});

	it("matches counting every substring on random inputs", () => {
		const random = createRandom(1297);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 15), "abc");
			const minSize = random.int(1, s.length);
			const maxSize = random.int(minSize, s.length);
			const maxLetters = random.int(1, 3);
			expect(maxFreq(s, maxLetters, minSize, maxSize)).toBe(
				byBruteForce(s, maxLetters, minSize, maxSize),
			);
		}
	});
});
