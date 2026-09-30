import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumAsciiDeleteSumForTwoStrings as minimumDeleteSum } from ".";

/** Tries keeping every common subsequence: the cost is everything else. */
const byBruteForce = (a: string, b: string): number => {
	const codes = (text: string) =>
		[...text].reduce((sum, char) => sum + char.charCodeAt(0), 0);
	const subsequences = (text: string): Set<string> => {
		const all = new Set<string>();
		for (let mask = 0; mask < 1 << text.length; mask++)
			all.add([...text].filter((_, i) => mask & (1 << i)).join(""));
		return all;
	};
	const inB = subsequences(b);
	let best = Number.POSITIVE_INFINITY;
	for (const common of subsequences(a))
		if (inB.has(common))
			best = Math.min(best, codes(a) + codes(b) - 2 * codes(common));
	return best;
};

describe("712. Minimum ASCII Delete Sum for Two Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumDeleteSum("sea", "eat")).toBe(231);
		expect(minimumDeleteSum("delete", "leet")).toBe(403);
	});

	it("matches trying every common subsequence on random inputs", () => {
		const random = createRandom(712);
		for (let run = 0; run < 500; run++) {
			const a = random.string(random.int(1, 8), "abc");
			const b = random.string(random.int(1, 8), "abc");
			expect(minimumDeleteSum(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
