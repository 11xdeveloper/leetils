import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumDeletionsToMakeCharacterFrequenciesUnique as minDeletions } from ".";

/** Tries every kept count for every letter. */
const byBruteForce = (s: string): number => {
	const counts = [...new Set(s)].map(
		(char) => [...s].filter((c) => c === char).length,
	);
	let best = Infinity;
	const choose = (i: number, kept: number[]) => {
		if (i === counts.length) {
			const positive = kept.filter((count) => count > 0);
			if (new Set(positive).size === positive.length) {
				best = Math.min(
					best,
					s.length - kept.reduce((sum, count) => sum + count, 0),
				);
			}
			return;
		}
		for (let keep = 0; keep <= (counts[i] ?? 0); keep++)
			choose(i + 1, [...kept, keep]);
	};
	choose(0, []);
	return best;
};

describe("1647. Minimum Deletions to Make Character Frequencies Unique", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDeletions("aab")).toBe(0);
		expect(minDeletions("aaabbbcc")).toBe(2);
		expect(minDeletions("ceabaacb")).toBe(2);
	});

	it("matches trying every kept count on random strings", () => {
		const random = createRandom(1647);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 12), "abcd");
			expect(minDeletions(s)).toBe(byBruteForce(s));
		}
	});
});
