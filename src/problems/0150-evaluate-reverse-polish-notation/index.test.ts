import { describe, expect, it } from "bun:test";
import { evaluateReversePolishNotation as evaluate } from ".";

describe("150. Evaluate Reverse Polish Notation", () => {
	it("solves the examples from the problem statement", () => {
		expect(evaluate(["2", "1", "+", "3", "*"])).toBe(9);
		expect(evaluate(["4", "13", "5", "/", "+"])).toBe(6);
		expect(
			evaluate([
				"10",
				"6",
				"9",
				"3",
				"+",
				"-11",
				"*",
				"/",
				"*",
				"17",
				"+",
				"5",
				"+",
			]),
		).toBe(22);
	});

	it("handles a single number", () => {
		expect(evaluate(["-7"])).toBe(-7);
	});

	it("truncates division towards zero, never returning -0", () => {
		expect(evaluate(["7", "-2", "/"])).toBe(-3);
		expect(evaluate(["-7", "2", "/"])).toBe(-3);
		expect(evaluate(["1", "-2", "/"])).toBe(0);
	});

	it("applies operands in order for subtraction and division", () => {
		expect(evaluate(["3", "10", "-"])).toBe(-7);
		expect(evaluate(["3", "10", "/"])).toBe(0);
	});
});
