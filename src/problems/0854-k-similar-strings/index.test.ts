import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kSimilarStrings as kSimilarity } from ".";

/** Breadth-first search trying every swap. */
const bySearch = (s1: string, s2: string): number => {
	const seen = new Set([s1]);
	let frontier = [s1];
	for (let swaps = 0; ; swaps++) {
		const next: string[] = [];
		for (const current of frontier) {
			if (current === s2) return swaps;
			for (let i = 0; i < current.length; i++) {
				for (let j = i + 1; j < current.length; j++) {
					const chars = [...current];
					[chars[i], chars[j]] = [chars[j] ?? "", chars[i] ?? ""];
					const swapped = chars.join("");
					if (!seen.has(swapped)) {
						seen.add(swapped);
						next.push(swapped);
					}
				}
			}
		}
		frontier = next;
	}
};

describe("854. K-Similar Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(kSimilarity("ab", "ba")).toBe(1);
		expect(kSimilarity("abc", "bca")).toBe(2);
	});

	it("matches trying every swap on random anagrams", () => {
		const random = createRandom(854);
		for (let run = 0; run < 300; run++) {
			const s1 = random.string(random.int(1, 6), "abcdef");
			const s2 = [...s1].sort(() => random.next() - 0.5).join("");
			expect(kSimilarity(s1, s2)).toBe(bySearch(s1, s2));
		}
	});

	it("handles twenty letters", () => {
		expect(
			kSimilarity("abcdefabcdefabcdefab", "fedcbafedcbafedcbaba"),
		).toBeGreaterThan(0);
	});
});
