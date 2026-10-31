import { describe, expect, it } from "bun:test";
import { checkIfThereIsAValidParenthesesStringPath as hasValidPath } from ".";

describe("2267. Check if There Is a Valid Parentheses String Path", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			hasValidPath([
				["(", "(", "("],
				[")", "(", ")"],
				["(", "(", ")"],
				["(", "(", ")"],
			]),
		).toBeTrue();
		expect(
			hasValidPath([
				[")", ")"],
				["(", "("],
			]),
		).toBeFalse();
	});

	it("handles a single row", () => {
		expect(hasValidPath([["(", ")"]])).toBeTrue();
		expect(hasValidPath([[")", "("]])).toBeFalse();
	});
});
