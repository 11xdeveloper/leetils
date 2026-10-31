import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestPalindromeAfterSubstringConcatenationI as longestPalindrome } from ".";

/** Tries every pair of substrings. */
const byBruteForce = (s: string, t: string): number => {
	let best = 0;
	for (let a = 0; a <= s.length; a++)
		for (let b = a; b <= s.length; b++)
			for (let c = 0; c <= t.length; c++)
				for (let d = c; d <= t.length; d++) {
					const joined = s.slice(a, b) + t.slice(c, d);
					if (joined === [...joined].reverse().join(""))
						best = Math.max(best, joined.length);
				}
	return best;
};

describe("3503. Longest Palindrome After Substring Concatenation I", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestPalindrome("a", "a")).toBe(2);
		expect(longestPalindrome("abc", "def")).toBe(1);
		expect(longestPalindrome("b", "aaaa")).toBe(4);
		expect(longestPalindrome("abcde", "ecdba")).toBe(5);
	});

	it("matches trying every pair on random strings", () => {
		const random = createRandom(3503);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 6), "ab");
			const t = random.string(random.int(1, 6), "ab");
			expect(longestPalindrome(s, t)).toBe(byBruteForce(s, t));
		}
	});
});
