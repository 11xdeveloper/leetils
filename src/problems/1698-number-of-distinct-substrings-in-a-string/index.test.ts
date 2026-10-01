import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfDistinctSubstringsInAString as countDistinct } from ".";

/** Collects every substring in a set. */
const byBruteForce = (s: string): number => {
	const substrings = new Set<string>();
	for (let i = 0; i < s.length; i++)
		for (let j = i + 1; j <= s.length; j++) substrings.add(s.slice(i, j));
	return substrings.size;
};

describe("1698. Number of Distinct Substrings in a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(countDistinct("aabbaba")).toBe(21);
		expect(countDistinct("abcdefg")).toBe(28);
	});

	it("matches collecting every substring on random strings", () => {
		const random = createRandom(1698);
		for (let run = 0; run < 300; run++) {
			const s = random.string(
				random.int(1, 30),
				random.int(0, 1) ? "ab" : "abc",
			);
			expect(countDistinct(s)).toBe(byBruteForce(s));
		}
	});
});
