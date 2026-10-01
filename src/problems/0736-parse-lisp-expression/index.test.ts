import { describe, expect, it } from "bun:test";
import { parseLispExpression as evaluate } from ".";

describe("736. Parse Lisp Expression", () => {
	it("solves the examples from the problem statement", () => {
		expect(evaluate("(let x 2 (mult x (let x 3 y 4 (add x y))))")).toBe(14);
		expect(evaluate("(let x 3 x 2 x)")).toBe(2);
		expect(evaluate("(let x 1 y 2 x (add x y) (add x y))")).toBe(5);
	});

	it("handles scoping, negative numbers and nested operations", () => {
		expect(evaluate("(let x 2 (add (let x 3 (let x 4 x)) x))")).toBe(6);
		expect(evaluate("(let a1 3 b2 (add a1 1) b2)")).toBe(4);
		expect(evaluate("(add 1 2)")).toBe(3);
		expect(evaluate("(mult 3 (add 2 3))")).toBe(15);
		expect(evaluate("(let x 7 -12)")).toBe(-12);
		expect(evaluate("(let x -2 y x (mult x (add y -3)))")).toBe(10);
		expect(evaluate("-7")).toBe(-7);
	});
});
