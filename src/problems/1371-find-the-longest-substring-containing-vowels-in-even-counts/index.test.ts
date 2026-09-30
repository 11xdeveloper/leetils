import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheLongestSubstringContainingVowelsInEvenCounts as findTheLongestSubstring } from ".";

/** Checks every substring. */
const byBruteForce = (s: string): number => {
	let longest = 0;
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length; j++) {
			const sub = s.slice(i, j);
			if ([..."aeiou"].every((v) => (sub.split(v).length - 1) % 2 === 0))
				longest = Math.max(longest, j - i);
		}
	}
	return longest;
};

describe("1371. Find the Longest Substring Containing Vowels in Even Counts", () => {
	it("solves the examples from the problem statement", () => {
		expect(findTheLongestSubstring("eleetminicoworoep")).toBe(13);
		expect(findTheLongestSubstring("leetcodeisgreat")).toBe(5);
		expect(findTheLongestSubstring("bcbcbc")).toBe(6);
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(1371);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 15), "aeioubc");
			expect(findTheLongestSubstring(s)).toBe(byBruteForce(s));
		}
	});
});
