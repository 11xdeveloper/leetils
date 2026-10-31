import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheOccurrenceOfFirstAlmostEqualSubstring as minStartingIndex } from ".";

/** Compares every window letter by letter. */
const byBruteForce = (s: string, pattern: string): number => {
	for (let i = 0; i + pattern.length <= s.length; i++) {
		let diff = 0;
		for (let j = 0; j < pattern.length; j++)
			if (s[i + j] !== pattern[j]) diff++;
		if (diff <= 1) return i;
	}
	return -1;
};

describe("3303. Find the Occurrence of First Almost Equal Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(minStartingIndex("abcdefg", "bcdffg")).toBe(1);
		expect(minStartingIndex("ababbababa", "bacaba")).toBe(4);
		expect(minStartingIndex("abcd", "dba")).toBe(-1);
		expect(minStartingIndex("dde", "d")).toBe(0);
	});

	it("matches comparing every window on random strings", () => {
		const random = createRandom(3303);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(2, 15), "ab");
			const pattern = random.string(random.int(1, s.length - 1), "ab");
			expect(minStartingIndex(s, pattern)).toBe(byBruteForce(s, pattern));
		}
	});
});
