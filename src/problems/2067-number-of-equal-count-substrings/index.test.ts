import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfEqualCountSubstrings as equalCountSubstrings } from ".";

/** Checks every substring. */
const byBruteForce = (s: string, count: number): number => {
	let total = 0;
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length; j++) {
			const counts = new Map<string, number>();
			for (const char of s.slice(i, j))
				counts.set(char, (counts.get(char) ?? 0) + 1);
			if ([...counts.values()].every((c) => c === count)) total++;
		}
	}
	return total;
};

describe("2067. Number of Equal Count Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(equalCountSubstrings("aaabcbbcc", 3)).toBe(3);
		expect(equalCountSubstrings("abcd", 2)).toBe(0);
		expect(equalCountSubstrings("a", 5)).toBe(0);
	});

	it("matches checking every substring on random strings", () => {
		const random = createRandom(2067);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 15), "abc");
			const count = random.int(1, 3);
			expect(equalCountSubstrings(s, count)).toBe(byBruteForce(s, count));
		}
	});
});
