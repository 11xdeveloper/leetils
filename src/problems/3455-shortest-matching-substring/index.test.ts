import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestMatchingSubstring } from ".";

/** Tests every substring with a regular expression. */
const byBruteForce = (s: string, p: string): number => {
	const pattern = new RegExp(`^${p.split("*").join(".*")}$`);
	let best = -1;
	for (let i = 0; i <= s.length; i++)
		for (let j = i; j <= s.length; j++)
			if (pattern.test(s.slice(i, j)) && (best === -1 || j - i < best))
				best = j - i;
	return best;
};

describe("3455. Shortest Matching Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestMatchingSubstring("abaacbaecebce", "ba*c*ce")).toBe(8);
		expect(shortestMatchingSubstring("baccbaadbc", "cc*baa*adb")).toBe(-1);
		expect(shortestMatchingSubstring("a", "**")).toBe(0);
		expect(shortestMatchingSubstring("madlogic", "*adlogi*")).toBe(6);
	});

	it("matches testing every substring on random inputs", () => {
		const random = createRandom(3455);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 10), "ab");
			const parts = [0, 1, 2].map(() => random.string(random.int(0, 2), "ab"));
			const p = parts.join("*");
			expect(shortestMatchingSubstring(s, p)).toBe(byBruteForce(s, p));
		}
	});
});
