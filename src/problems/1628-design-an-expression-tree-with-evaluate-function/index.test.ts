import { describe, expect, it } from "bun:test";
import { designAnExpressionTreeWithEvaluateFunction as buildTree } from ".";

describe("1628. Design an Expression Tree With Evaluate Function", () => {
	it("solves the examples from the problem statement", () => {
		expect(buildTree(["3", "4", "+", "2", "*", "7", "/"]).evaluate()).toBe(2);
		expect(buildTree(["4", "5", "2", "7", "+", "-", "*"]).evaluate()).toBe(-16);
	});

	it("handles a single number", () => {
		expect(buildTree(["42"]).evaluate()).toBe(42);
	});

	it("truncates division toward zero", () => {
		expect(buildTree(["0", "7", "-", "2", "/"]).evaluate()).toBe(-3);
	});
});
