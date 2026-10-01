import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stringCompressionII as getLengthOfOptimalCompression } from ".";

/** Tries every set of at most k deletions. */
const byBruteForce = (s: string, k: number): number => {
	const encode = (t: string) =>
		(t.match(/(.)\1*/g) ?? []).reduce(
			(sum, run) => sum + 1 + (run.length > 1 ? String(run.length).length : 0),
			0,
		);
	let best = Infinity;
	for (let mask = 0; mask < 2 ** s.length; mask++) {
		const kept = [...s].filter((_, i) => !(mask & (1 << i)));
		if (s.length - kept.length <= k)
			best = Math.min(best, encode(kept.join("")));
	}
	return best;
};

describe("1531. String Compression II", () => {
	it("solves the examples from the problem statement", () => {
		expect(getLengthOfOptimalCompression("aaabcccd", 2)).toBe(4);
		expect(getLengthOfOptimalCompression("aabbaa", 2)).toBe(2);
		expect(getLengthOfOptimalCompression("aaaaaaaaaaa", 0)).toBe(3);
	});

	it("handles a hundred copies of a letter", () => {
		expect(getLengthOfOptimalCompression("a".repeat(100), 0)).toBe(4);
		expect(getLengthOfOptimalCompression("a".repeat(100), 1)).toBe(3);
	});

	it("matches trying every deletion on random inputs", () => {
		const random = createRandom(1531);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 10), "ab");
			const k = random.int(0, s.length);
			expect(getLengthOfOptimalCompression(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
