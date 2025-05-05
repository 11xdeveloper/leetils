import { describe, expect, it } from "bun:test";
import { lengthOfLongestSubstring } from "./index";

describe("lengthOfLongestSubstring", () => {
	it("should find basic substrings without repeating characters", () => {
		expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
		expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
	});

	it("should handle strings with all same characters", () => {
		expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
		expect(lengthOfLongestSubstring("aaa")).toBe(1);
	});

	it("should handle empty strings", () => {
		expect(lengthOfLongestSubstring("")).toBe(0);
	});

	it("should handle single character strings", () => {
		expect(lengthOfLongestSubstring("a")).toBe(1);
		expect(lengthOfLongestSubstring(" ")).toBe(1);
	});

	it("should handle strings with spaces and special characters", () => {
		expect(lengthOfLongestSubstring("ab c")).toBe(4);
		expect(lengthOfLongestSubstring("!@#$%")).toBe(5);
		expect(lengthOfLongestSubstring("a!b@c#")).toBe(6);
	});

	it("should handle strings where longest substring is at the end", () => {
		expect(lengthOfLongestSubstring("aabcd")).toBe(4);
		expect(lengthOfLongestSubstring("aaabcd")).toBe(4);
	});

	it("should handle strings where longest substring is at the beginning", () => {
		expect(lengthOfLongestSubstring("abcaa")).toBe(3);
		expect(lengthOfLongestSubstring("abcdaa")).toBe(4);
	});
});
