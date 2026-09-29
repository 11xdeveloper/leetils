import { describe, expect, it } from "bun:test";
import { longestSubstringWithoutRepeatingCharacters } from ".";

describe("3. Longest Substring Without Repeating Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubstringWithoutRepeatingCharacters("abcabcbb")).toBe(3);
		expect(longestSubstringWithoutRepeatingCharacters("bbbbb")).toBe(1);
		expect(longestSubstringWithoutRepeatingCharacters("pwwkew")).toBe(3);
	});

	it("handles empty and single-character strings", () => {
		expect(longestSubstringWithoutRepeatingCharacters("")).toBe(0);
		expect(longestSubstringWithoutRepeatingCharacters("a")).toBe(1);
		expect(longestSubstringWithoutRepeatingCharacters(" ")).toBe(1);
	});

	it("counts spaces, digits and symbols as characters", () => {
		expect(longestSubstringWithoutRepeatingCharacters("ab c")).toBe(4);
		expect(longestSubstringWithoutRepeatingCharacters("a1!b2@")).toBe(6);
	});

	it("finds the longest substring at the start, middle or end", () => {
		expect(longestSubstringWithoutRepeatingCharacters("abcdaa")).toBe(4);
		expect(longestSubstringWithoutRepeatingCharacters("aabcdee")).toBe(5);
		expect(longestSubstringWithoutRepeatingCharacters("aaabcd")).toBe(4);
	});

	it("ignores repeats that are already outside the window", () => {
		expect(longestSubstringWithoutRepeatingCharacters("abba")).toBe(2);
		expect(longestSubstringWithoutRepeatingCharacters("tmmzuxt")).toBe(5);
		expect(longestSubstringWithoutRepeatingCharacters("dvdf")).toBe(3);
	});
});
