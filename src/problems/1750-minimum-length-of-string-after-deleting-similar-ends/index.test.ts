import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumLengthOfStringAfterDeletingSimilarEnds as minimumLength } from ".";

/** Tries every prefix and suffix length, memoised by the remaining string. */
const byBruteForce = (s: string): number => {
	const memo = new Map<string, number>();
	const best = (t: string): number => {
		const cached = memo.get(t);
		if (cached !== undefined) return cached;
		let result = t.length;
		const char = t[0];
		for (let p = 1; p < t.length && t[p - 1] === char; p++) {
			for (let q = 1; p + q <= t.length && t[t.length - q] === char; q++) {
				result = Math.min(result, best(t.slice(p, t.length - q)));
			}
		}
		memo.set(t, result);
		return result;
	};
	return best(s);
};

describe("1750. Minimum Length of String After Deleting Similar Ends", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumLength("ca")).toBe(2);
		expect(minimumLength("cabaabac")).toBe(0);
		expect(minimumLength("aabccabba")).toBe(3);
	});

	it("matches trying every removal on random strings", () => {
		const random = createRandom(1750);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 10), "abc");
			expect(minimumLength(s)).toBe(byBruteForce(s));
		}
	});
});
