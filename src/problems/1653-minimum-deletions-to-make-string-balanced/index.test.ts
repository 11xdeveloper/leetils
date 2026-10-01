import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumDeletionsToMakeStringBalanced as minimumDeletions } from ".";

/** Tries every split point: delete the b's before it and the a's after it. */
const byBruteForce = (s: string): number => {
	let best = Infinity;
	for (let split = 0; split <= s.length; split++) {
		const bsBefore = [...s.slice(0, split)].filter((c) => c === "b").length;
		const asAfter = [...s.slice(split)].filter((c) => c === "a").length;
		best = Math.min(best, bsBefore + asAfter);
	}
	return best;
};

describe("1653. Minimum Deletions to Make String Balanced", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumDeletions("aababbab")).toBe(2);
		expect(minimumDeletions("bbaaaaabb")).toBe(2);
	});

	it("matches trying every split on random strings", () => {
		const random = createRandom(1653);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 15), "ab");
			expect(minimumDeletions(s)).toBe(byBruteForce(s));
		}
	});
});
