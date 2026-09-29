import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestPalindrome } from ".";

const isPalindrome = (s: string): boolean => s === [...s].reverse().join("");

/** Adds more and more of the reversed suffix until the result is a palindrome. */
const byBruteForce = (s: string): string => {
	for (let added = 0; added <= s.length; added++) {
		const candidate = [...s.slice(s.length - added)].reverse().join("") + s;
		if (isPalindrome(candidate)) return candidate;
	}
	return s;
};

describe("214. Shortest Palindrome", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestPalindrome("aacecaaa")).toBe("aaacecaaa");
		expect(shortestPalindrome("abcd")).toBe("dcbabcd");
	});

	it("leaves palindromes and empty strings unchanged", () => {
		expect(shortestPalindrome("")).toBe("");
		expect(shortestPalindrome("racecar")).toBe("racecar");
	});

	it("handles long repetitive inputs", () => {
		const s = `${"a".repeat(25_000)}b${"a".repeat(25_000)}c`;
		expect(shortestPalindrome(s)).toBe(`c${s}`);
	});

	it("matches adding characters one at a time on random inputs", () => {
		const random = createRandom(214);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(0, 12), "ab");
			expect(shortestPalindrome(s)).toBe(byBruteForce(s));
		}
	});
});
