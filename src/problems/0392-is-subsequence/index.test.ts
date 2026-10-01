import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { isSubsequence } from ".";

const byBruteForce = (s: string, t: string): boolean => {
	for (let mask = 0; mask < 1 << t.length; mask++) {
		if ([...t].filter((_, i) => mask & (1 << i)).join("") === s) return true;
	}
	return false;
};

describe("392. Is Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(isSubsequence("abc", "ahbgdc")).toBeTrue();
		expect(isSubsequence("axc", "ahbgdc")).toBeFalse();
	});

	it("treats the empty string as a subsequence of anything", () => {
		expect(isSubsequence("", "")).toBeTrue();
		expect(isSubsequence("", "abc")).toBeTrue();
	});

	it("matches trying every deletion on random inputs", () => {
		const random = createRandom(392);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(0, 4), "ab");
			const t = random.string(random.int(0, 8), "ab");
			expect(isSubsequence(s, t)).toBe(byBruteForce(s, t));
		}
	});
});
