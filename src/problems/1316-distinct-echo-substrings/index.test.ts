import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { distinctEchoSubstrings } from ".";

/** Collects every echo substring in a set. */
const byBruteForce = (text: string): number => {
	const echoes = new Set<string>();
	for (let i = 0; i < text.length; i++) {
		for (let half = 1; i + 2 * half <= text.length; half++) {
			if (text.slice(i, i + half) === text.slice(i + half, i + 2 * half)) {
				echoes.add(text.slice(i, i + 2 * half));
			}
		}
	}
	return echoes.size;
};

describe("1316. Distinct Echo Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(distinctEchoSubstrings("abcabcabc")).toBe(3);
		expect(distinctEchoSubstrings("leetcodeleetcode")).toBe(2);
	});

	it("handles 2000 repeated letters quickly", () => {
		expect(distinctEchoSubstrings("a".repeat(2000))).toBe(1000);
		// Halves of even length 2 … 1000, each starting with a or b, except the whole string.
		expect(distinctEchoSubstrings("ab".repeat(1000))).toBe(999);
	});

	it("matches collecting every echo on random inputs", () => {
		const random = createRandom(1316);
		for (let run = 0; run < 300; run++) {
			const text = random.string(
				random.int(1, 16),
				"abc".slice(0, random.int(1, 3)),
			);
			expect(distinctEchoSubstrings(text)).toBe(byBruteForce(text));
		}
	});
});
