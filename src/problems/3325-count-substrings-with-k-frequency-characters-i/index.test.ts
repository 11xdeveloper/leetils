import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubstringsWithKFrequencyCharactersI as numberOfSubstrings } from ".";

/** Checks every substring. */
const byBruteForce = (s: string, k: number): number => {
	let count = 0;
	for (let i = 0; i < s.length; i++) {
		const seen = new Map<string, number>();
		let ok = false;
		for (let j = i; j < s.length; j++) {
			const c = s.charAt(j);
			seen.set(c, (seen.get(c) ?? 0) + 1);
			if ((seen.get(c) ?? 0) >= k) ok = true;
			if (ok) count++;
		}
	}
	return count;
};

describe("3325. Count Substrings With K-Frequency Characters I", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfSubstrings("abacb", 2)).toBe(4);
		expect(numberOfSubstrings("abcde", 1)).toBe(15);
	});

	it("matches checking every substring on random strings", () => {
		const random = createRandom(3325);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 15), "abc");
			const k = random.int(1, 4);
			expect(numberOfSubstrings(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
