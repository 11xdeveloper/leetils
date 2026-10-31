import { describe, expect, it } from "bun:test";
import { evaluateValidExpressions as evaluateExpression } from ".";

describe("3749. Evaluate Valid Expressions", () => {
	it("solves the examples from the problem statement", () => {
		expect(evaluateExpression("add(2,3)")).toBe(5);
		expect(evaluateExpression("add(2,mul(3,4))")).toBe(14);
		expect(evaluateExpression("-42")).toBe(-42);
	});

	it("divides toward zero", () => {
		expect(evaluateExpression("div(-7,2)")).toBe(-3);
		expect(evaluateExpression("sub(div(9,2),mul(-1,3))")).toBe(7);
	});
});
