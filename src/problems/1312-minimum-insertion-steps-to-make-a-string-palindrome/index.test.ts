import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumInsertionStepsToMakeAStringPalindrome as minInsertions } from ".";

/** Matching ends cost nothing; otherwise insert a copy of one end and recurse. */
const byBruteForce = (s: string): number => {
	if (s.length <= 1) return 0;
	if (s[0] === s.at(-1)) return byBruteForce(s.slice(1, -1));
	return 1 + Math.min(byBruteForce(s.slice(1)), byBruteForce(s.slice(0, -1)));
};

describe("1312. Minimum Insertion Steps to Make a String Palindrome", () => {
	it("solves the examples from the problem statement", () => {
		expect(minInsertions("zzazz")).toBe(0);
		expect(minInsertions("mbadm")).toBe(2);
		expect(minInsertions("leetcode")).toBe(5);
	});

	it("handles 500 characters", () => {
		// The longest palindromic subsequence is one of the halves.
		expect(minInsertions("a".repeat(250) + "b".repeat(250))).toBe(250);
		expect(minInsertions("ab".repeat(250))).toBe(1);
	});

	it("matches recursion on the ends for random inputs", () => {
		const random = createRandom(1312);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 10), "abc");
			expect(minInsertions(s)).toBe(byBruteForce(s));
		}
	});
});
