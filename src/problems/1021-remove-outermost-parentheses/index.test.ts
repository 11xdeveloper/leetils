import { describe, expect, it } from "bun:test";
import { removeOutermostParentheses } from ".";

describe("1021. Remove Outermost Parentheses", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeOutermostParentheses("(()())(())")).toBe("()()()");
		expect(removeOutermostParentheses("(()())(())(()(()))")).toBe(
			"()()()()(())",
		);
		expect(removeOutermostParentheses("()()")).toBe("");
	});
});
