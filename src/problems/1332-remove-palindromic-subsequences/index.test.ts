import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removePalindromicSubsequences as removePalindromeSub } from ".";

/** Breadth-first search, removing any palindromic subsequence each step. */
const byBruteForce = (s: string): number => {
	let frontier = [s];
	const seen = new Set(frontier);
	for (let steps = 0; ; steps++) {
		if (frontier.includes("")) return steps;
		const next: string[] = [];
		for (const t of frontier) {
			for (let mask = 1; mask < 2 ** t.length; mask++) {
				const removed = [...t].filter((_, i) => mask & (1 << i)).join("");
				if (removed !== [...removed].reverse().join("")) continue;
				const rest = [...t].filter((_, i) => !(mask & (1 << i))).join("");
				if (seen.has(rest)) continue;
				seen.add(rest);
				next.push(rest);
			}
		}
		frontier = next;
	}
};

describe("1332. Remove Palindromic Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(removePalindromeSub("ababa")).toBe(1);
		expect(removePalindromeSub("abb")).toBe(2);
		expect(removePalindromeSub("baabb")).toBe(2);
	});

	it("matches searching over removals on random strings", () => {
		const random = createRandom(1332);
		for (let run = 0; run < 100; run++) {
			const s = random.string(random.int(1, 8), "ab");
			expect(removePalindromeSub(s)).toBe(byBruteForce(s));
		}
	});
});
