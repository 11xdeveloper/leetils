import { describe, expect, it } from "bun:test";
import { evaluateTheBracketPairsOfAString as evaluate } from ".";

describe("1807. Evaluate the Bracket Pairs of a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			evaluate("(name)is(age)yearsold", [
				["name", "bob"],
				["age", "two"],
			]),
		).toBe("bobistwoyearsold");
		expect(evaluate("hi(name)", [["a", "b"]])).toBe("hi?");
		expect(evaluate("(a)(a)(a)aaa", [["a", "yes"]])).toBe("yesyesyesaaa");
	});
});
