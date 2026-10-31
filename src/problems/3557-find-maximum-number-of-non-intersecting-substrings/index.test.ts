import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findMaximumNumberOfNonIntersectingSubstrings as maxSubstrings } from ".";

/** Dynamic programming over every substring. */
const byBruteForce = (word: string): number => {
	const best = new Array<number>(word.length + 1).fill(0);
	for (let j = 1; j <= word.length; j++) {
		best[j] = best[j - 1] ?? 0;
		for (let i = 0; i + 4 <= j; i++)
			if (word[i] === word[j - 1])
				best[j] = Math.max(best[j] ?? 0, (best[i] ?? 0) + 1);
	}
	return best[word.length] ?? 0;
};

describe("3557. Find Maximum Number of Non Intersecting Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSubstrings("abcdeafdef")).toBe(2);
		expect(maxSubstrings("bcdaaaab")).toBe(1);
	});

	it("matches dynamic programming on random words", () => {
		const random = createRandom(3557);
		for (let run = 0; run < 300; run++) {
			const word = random.string(random.int(1, 16), "abc");
			expect(maxSubstrings(word)).toBe(byBruteForce(word));
		}
	});
});
