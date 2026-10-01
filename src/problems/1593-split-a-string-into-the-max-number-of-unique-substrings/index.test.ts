import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { splitAStringIntoTheMaxNumberOfUniqueSubstrings as maxUniqueSplit } from ".";

/** Tries every set of cut positions. */
const byBruteForce = (s: string): number => {
	let best = 0;
	for (let cuts = 0; cuts < 2 ** (s.length - 1); cuts++) {
		const pieces: string[] = [];
		let start = 0;
		for (let i = 1; i <= s.length; i++) {
			if (i === s.length || cuts & (1 << (i - 1))) {
				pieces.push(s.slice(start, i));
				start = i;
			}
		}
		if (new Set(pieces).size === pieces.length)
			best = Math.max(best, pieces.length);
	}
	return best;
};

describe("1593. Split a String Into the Max Number of Unique Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxUniqueSplit("ababccc")).toBe(5);
		expect(maxUniqueSplit("aba")).toBe(2);
		expect(maxUniqueSplit("aa")).toBe(1);
	});

	it("handles sixteen letters", () => {
		expect(maxUniqueSplit("a".repeat(16))).toBe(5);
		expect(maxUniqueSplit("abcdefghijklmnop")).toBe(16);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1593);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 12), "ab");
			expect(maxUniqueSplit(s)).toBe(byBruteForce(s));
		}
	});
});
