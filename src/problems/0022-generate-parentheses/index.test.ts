import { describe, expect, it } from "bun:test";
import { validParentheses } from "../0020-valid-parentheses";
import { generateParentheses } from ".";

// The Catalan numbers: how many well-formed strings there are of n pairs.
const CATALAN = [1, 1, 2, 5, 14, 42, 132, 429, 1430];

describe("22. Generate Parentheses", () => {
	it("solves the examples from the problem statement", () => {
		expect(generateParentheses(3)).toEqual([
			"((()))",
			"(()())",
			"(())()",
			"()(())",
			"()()()",
		]);
		expect(generateParentheses(1)).toEqual(["()"]);
	});

	it("returns every well-formed string exactly once, up to the constraint of 8 pairs", () => {
		for (let n = 1; n <= 8; n++) {
			const results = generateParentheses(n);
			expect(results).toHaveLength(CATALAN[n] ?? 0);
			expect(new Set(results).size).toBe(results.length);
			for (const result of results) {
				expect(result).toHaveLength(2 * n);
				expect(validParentheses(result)).toBeTrue();
			}
		}
	});
});
