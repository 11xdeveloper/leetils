import { describe, expect, it } from "bun:test";
import { longestUncommonSubsequenceI as findLUSlength } from ".";

describe("521. Longest Uncommon Subsequence I", () => {
	it("solves the examples from the problem statement", () => {
		expect(findLUSlength("aba", "cdc")).toBe(3);
		expect(findLUSlength("aaa", "bbb")).toBe(3);
		expect(findLUSlength("aaa", "aaa")).toBe(-1);
	});

	it("uses the longer string when one contains the other", () => {
		expect(findLUSlength("abc", "abcde")).toBe(5);
	});
});
