import { describe, expect, it } from "bun:test";
import { minimizeResultByAddingParenthesesToExpression as minimizeResult } from ".";

describe("2232. Minimize Result by Adding Parentheses to Expression", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimizeResult("247+38")).toBe("2(47+38)");
		expect(minimizeResult("12+34")).toBe("1(2+3)4");
		expect(minimizeResult("999+999")).toBe("(999+999)");
	});
});
