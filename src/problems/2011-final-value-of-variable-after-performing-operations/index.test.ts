import { describe, expect, it } from "bun:test";
import { finalValueOfVariableAfterPerformingOperations as finalValue } from ".";

describe("2011. Final Value of Variable After Performing Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(finalValue(["--X", "X++", "X++"])).toBe(1);
		expect(finalValue(["++X", "++X", "X++"])).toBe(3);
		expect(finalValue(["X++", "++X", "--X", "X--"])).toBe(0);
	});
});
