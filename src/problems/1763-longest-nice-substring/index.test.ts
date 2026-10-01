import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestNiceSubstring } from ".";

/** Checks every substring, keeping the first of the longest. */
const byBruteForce = (s: string): string => {
	let best = "";
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length; j++) {
			const sub = s.slice(i, j);
			const letters = new Set(sub);
			const nice = [...letters].every(
				(c) => letters.has(c.toLowerCase()) && letters.has(c.toUpperCase()),
			);
			if (nice && sub.length > best.length) best = sub;
		}
	}
	return best;
};

describe("1763. Longest Nice Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestNiceSubstring("YazaAay")).toBe("aAa");
		expect(longestNiceSubstring("Bb")).toBe("Bb");
		expect(longestNiceSubstring("c")).toBe("");
	});

	it("matches checking every substring on random strings", () => {
		const random = createRandom(1763);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "aAbBc");
			expect(longestNiceSubstring(s)).toBe(byBruteForce(s));
		}
	});
});
