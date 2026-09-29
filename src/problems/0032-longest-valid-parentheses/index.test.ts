import { describe, expect, it } from "bun:test";
import { validParentheses } from "../0020-valid-parentheses";
import { longestValidParentheses } from ".";

const byBruteForce = (s: string): number => {
	let longest = 0;
	for (let start = 0; start < s.length; start++) {
		for (let end = start + 2; end <= s.length; end += 2) {
			if (validParentheses(s.slice(start, end))) {
				longest = Math.max(longest, end - start);
			}
		}
	}
	return longest;
};

describe("32. Longest Valid Parentheses", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestValidParentheses("(()")).toBe(2);
		expect(longestValidParentheses(")()())")).toBe(4);
		expect(longestValidParentheses("")).toBe(0);
	});

	it("handles strings with no valid substring", () => {
		expect(longestValidParentheses("(((")).toBe(0);
		expect(longestValidParentheses(")))(((")).toBe(0);
	});

	it("joins adjacent valid substrings", () => {
		expect(longestValidParentheses("()(())")).toBe(6);
		expect(longestValidParentheses("()(()")).toBe(2);
	});

	it("matches checking every substring, for every string up to length 12", () => {
		let strings = [""];
		for (let length = 1; length <= 12; length++) {
			strings = strings.flatMap((s) => [`${s}(`, `${s})`]);
			for (const s of strings) {
				expect(longestValidParentheses(s)).toBe(byBruteForce(s));
			}
		}
	});
});
