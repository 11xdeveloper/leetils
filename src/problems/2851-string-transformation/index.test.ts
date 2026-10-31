import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stringTransformation as numberOfWays } from ".";

/** Counts operation sequences directly. */
const byBruteForce = (s: string, t: string, k: number): number => {
	let ways = new Map([[s, 1]]);
	for (let step = 0; step < k; step++) {
		const next = new Map<string, number>();
		for (const [word, count] of ways)
			for (let l = 1; l < word.length; l++) {
				const moved = word.slice(-l) + word.slice(0, -l);
				next.set(moved, (next.get(moved) ?? 0) + count);
			}
		ways = next;
	}
	return ways.get(t) ?? 0;
};

describe("2851. String Transformation", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfWays("abcd", "cdab", 2)).toBe(2);
		expect(numberOfWays("ababab", "ababab", 1)).toBe(2);
	});

	it("matches counting sequences on random strings", () => {
		const random = createRandom(2851);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(2, 6), "ab");
			const shift = random.int(0, s.length - 1);
			const t = random.int(0, 3)
				? s.slice(shift) + s.slice(0, shift)
				: random.string(s.length, "ab");
			const k = random.int(1, 5);
			expect(numberOfWays(s, t, k)).toBe(byBruteForce(s, t, k));
		}
	});

	it("handles huge k", () => {
		expect(numberOfWays("ab", "ba", 1_000_000_000_000_001)).toBe(1);
		expect(numberOfWays("ab", "ba", 1_000_000_000_000_000)).toBe(0);
	});
});
