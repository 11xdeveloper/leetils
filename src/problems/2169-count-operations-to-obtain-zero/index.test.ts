import { describe, expect, it } from "bun:test";
import { countOperationsToObtainZero as countOperations } from ".";

describe("2169. Count Operations to Obtain Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(countOperations(2, 3)).toBe(3);
		expect(countOperations(10, 10)).toBe(1);
	});

	it("handles zero inputs", () => {
		expect(countOperations(0, 5)).toBe(0);
	});
});
