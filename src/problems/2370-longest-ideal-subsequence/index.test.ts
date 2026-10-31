import { describe, expect, it } from "bun:test";
import { longestIdealSubsequence as longestIdealString } from ".";

describe("2370. Longest Ideal Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestIdealString("acfgbd", 2)).toBe(4);
		expect(longestIdealString("abcd", 3)).toBe(4);
	});
});
