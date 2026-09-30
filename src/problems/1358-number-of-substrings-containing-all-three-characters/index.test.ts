import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfSubstringsContainingAllThreeCharacters as numberOfSubstrings } from ".";

/** Checks every substring. */
const byBruteForce = (s: string): number => {
	let count = 0;
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length; j++) {
			if (new Set(s.slice(i, j)).size === 3) count++;
		}
	}
	return count;
};

describe("1358. Number of Substrings Containing All Three Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfSubstrings("abcabc")).toBe(10);
		expect(numberOfSubstrings("aaacb")).toBe(3);
		expect(numberOfSubstrings("abc")).toBe(1);
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(1358);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(3, 15), "abc");
			expect(numberOfSubstrings(s)).toBe(byBruteForce(s));
		}
	});
});
