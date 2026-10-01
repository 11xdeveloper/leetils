import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestMergeOfTwoStrings as largestMerge } from ".";

/** The largest of every possible merge. */
const byBruteForce = (a: string, b: string): string => {
	if (!a) return b;
	if (!b) return a;
	const first = (a[0] ?? "") + byBruteForce(a.slice(1), b);
	const second = (b[0] ?? "") + byBruteForce(a, b.slice(1));
	return first > second ? first : second;
};

describe("1754. Largest Merge Of Two Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestMerge("cabaa", "bcaaa")).toBe("cbcabaaaaa");
		expect(largestMerge("abcabc", "abdcaba")).toBe("abdcabcabcaba");
	});

	it("matches trying every merge on random inputs", () => {
		const random = createRandom(1754);
		for (let run = 0; run < 200; run++) {
			const [a, b] = [
				random.string(random.int(1, 6), "abc"),
				random.string(random.int(1, 6), "abc"),
			];
			expect(largestMerge(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
