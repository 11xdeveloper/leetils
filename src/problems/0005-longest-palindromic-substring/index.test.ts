import { describe, expect, it } from "bun:test";
import { longestPalindromicSubstring } from ".";

const isPalindrome = (s: string): boolean =>
	s === s.split("").reverse().join("");

/** Checks every substring, longest first. */
const longestByBruteForce = (s: string): string => {
	for (let length = s.length; length > 0; length--) {
		for (let start = 0; start + length <= s.length; start++) {
			const candidate = s.slice(start, start + length);
			if (isPalindrome(candidate)) return candidate;
		}
	}
	return "";
};

describe("5. Longest Palindromic Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestPalindromicSubstring("babad")).toBe("bab");
		expect(longestPalindromicSubstring("cbbd")).toBe("bb");
	});

	it("handles single characters and strings without longer palindromes", () => {
		expect(longestPalindromicSubstring("a")).toBe("a");
		expect(longestPalindromicSubstring("abc")).toBe("a");
	});

	it("finds odd- and even-length palindromes", () => {
		expect(longestPalindromicSubstring("racecar")).toBe("racecar");
		expect(longestPalindromicSubstring("abccba")).toBe("abccba");
		expect(longestPalindromicSubstring("aaaa")).toBe("aaaa");
	});

	it("finds palindromes at the start, middle or end", () => {
		expect(longestPalindromicSubstring("abaxyz")).toBe("aba");
		expect(longestPalindromicSubstring("xabbay")).toBe("abba");
		expect(longestPalindromicSubstring("xyzaba")).toBe("aba");
	});

	it("handles digits", () => {
		expect(longestPalindromicSubstring("1232145")).toBe("12321");
		expect(longestPalindromicSubstring("9123214")).toBe("12321");
	});

	it("matches a brute-force search on every string of a, b and c up to length 7", () => {
		const strings = [""];
		for (let length = 1; length <= 7; length++) {
			for (const s of strings.splice(0)) {
				strings.push(`${s}a`, `${s}b`, `${s}c`);
			}
			for (const s of strings) {
				expect(longestPalindromicSubstring(s)).toBe(longestByBruteForce(s));
			}
		}
	});
});
