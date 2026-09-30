import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { validPalindromeIII as isValidPalindrome } from ".";

/** Tries every set of characters to keep. */
const byBruteForce = (s: string, k: number): boolean => {
	for (let mask = 0; mask < 2 ** s.length; mask++) {
		const kept = [...s].filter((_, i) => mask & (1 << i)).join("");
		if (s.length - kept.length <= k && kept === [...kept].reverse().join(""))
			return true;
	}
	return false;
};

describe("1216. Valid Palindrome III", () => {
	it("solves the examples from the problem statement", () => {
		expect(isValidPalindrome("abcdeca", 2)).toBeTrue();
		expect(isValidPalindrome("abbababa", 1)).toBeTrue();
	});

	it("handles long strings", () => {
		const s = "ab".repeat(500);
		expect(isValidPalindrome(s, 1)).toBeTrue();
		const halves = "a".repeat(500) + "b".repeat(500);
		expect(isValidPalindrome(halves, 500)).toBeTrue();
		expect(isValidPalindrome(halves, 499)).toBeFalse();
	});

	it("matches trying every deletion on random inputs", () => {
		const random = createRandom(1216);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 10), "abc");
			const k = random.int(1, s.length);
			expect(isValidPalindrome(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
