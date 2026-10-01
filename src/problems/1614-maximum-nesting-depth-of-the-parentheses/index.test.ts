import { describe, expect, it } from "bun:test";
import { maximumNestingDepthOfTheParentheses as maxDepth } from ".";

describe("1614. Maximum Nesting Depth of the Parentheses", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDepth("(1+(2*3)+((8)/4))+1")).toBe(3);
		expect(maxDepth("(1)+((2))+(((3)))")).toBe(3);
		expect(maxDepth("()(())((()()))")).toBe(3);
	});

	it("returns 0 without parentheses", () => {
		expect(maxDepth("1+2")).toBe(0);
	});
});
