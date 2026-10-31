import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfMovesToMakePalindrome as minMovesToPalindrome } from ".";

/** Breadth-first search over adjacent swaps. */
const byBruteForce = (s: string): number => {
	const isPalindrome = (t: string): boolean => t === [...t].reverse().join("");
	const seen = new Set([s]);
	let level = [s];
	for (let moves = 0; ; moves++) {
		if (level.some(isPalindrome)) return moves;
		const next: string[] = [];
		for (const t of level) {
			for (let i = 0; i + 1 < t.length; i++) {
				const swapped = t.slice(0, i) + t[i + 1] + t[i] + t.slice(i + 2);
				if (seen.has(swapped)) continue;
				seen.add(swapped);
				next.push(swapped);
			}
		}
		level = next;
	}
};

describe("2193. Minimum Number of Moves to Make Palindrome", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMovesToPalindrome("aabb")).toBe(2);
		expect(minMovesToPalindrome("letelt")).toBe(2);
	});

	it("matches searching every swap on random palindrome anagrams", () => {
		const random = createRandom(2193);
		for (let run = 0; run < 100; run++) {
			const half = random.string(random.int(1, 3), "abc");
			const middle = random.int(0, 1) ? "" : random.string(1, "abc");
			const s = [...(half + middle + [...half].reverse().join(""))]
				.sort(() => random.next() - 0.5)
				.join("");
			expect(minMovesToPalindrome(s)).toBe(byBruteForce(s));
		}
	});
});
