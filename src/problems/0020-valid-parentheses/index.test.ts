import { describe, expect, it } from "bun:test";
import { validParentheses } from ".";

describe("20. Valid Parentheses", () => {
	it("solves the examples from the problem statement", () => {
		expect(validParentheses("()")).toBe(true);
		expect(validParentheses("()[]{}")).toBe(true);
		expect(validParentheses("(]")).toBe(false);
		expect(validParentheses("([])")).toBe(true);
		expect(validParentheses("([)]")).toBe(false);
	});

	it("accepts nested and sequential pairs", () => {
		expect(validParentheses("{[]}")).toBe(true);
		expect(validParentheses("((()))")).toBe(true);
		expect(validParentheses("({[]}){}")).toBe(true);
		expect(validParentheses("((())){[]}")).toBe(true);
	});

	it("rejects brackets closed by the wrong type", () => {
		expect(validParentheses("{[}]")).toBe(false);
		expect(validParentheses("(}")).toBe(false);
	});

	it("rejects unclosed opening brackets", () => {
		expect(validParentheses("(")).toBe(false);
		expect(validParentheses("((())){[]}(")).toBe(false);
	});

	it("rejects closing brackets with nothing to close", () => {
		expect(validParentheses("}")).toBe(false);
		expect(validParentheses("())")).toBe(false);
		expect(validParentheses("][")).toBe(false);
	});
});
