import { describe, expect, it } from "bun:test";
import { functionComposition } from ".";

describe("2629. Function Composition", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			functionComposition([(x) => x + 1, (x) => x * x, (x) => 2 * x])(4),
		).toBe(65);
		expect(
			functionComposition([(x) => 10 * x, (x) => 10 * x, (x) => 10 * x])(1),
		).toBe(1000);
		expect(functionComposition([])(42)).toBe(42);
	});
});
