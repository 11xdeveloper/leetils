import { test, expect, describe } from "bun:test";
import { lengthOfLongestSubstring } from ".";

describe("Longest Substring Without Repeating Characters", () => {
	test("Given a string s, find the length of the longest substring without duplicate characters.", () => {
		expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
		expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
		expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
	});
});
