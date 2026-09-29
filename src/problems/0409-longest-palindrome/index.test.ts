import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestPalindrome } from ".";

describe("409. Longest Palindrome", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestPalindrome("abccccdd")).toBe(7);
		expect(longestPalindrome("a")).toBe(1);
	});

	it("is case-sensitive", () => {
		expect(longestPalindrome("Aa")).toBe(1);
	});

	it("matches counting pairs on random inputs", () => {
		const random = createRandom(409);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 20), "aAbc");
			const counts = [..."aAbc"].map(
				(c) => [...s].filter((x) => x === c).length,
			);
			const paired = counts.reduce((sum, c) => sum + c - (c % 2), 0);
			expect(longestPalindrome(s)).toBe(
				paired + (counts.some((c) => c % 2 === 1) ? 1 : 0),
			);
		}
	});
});
