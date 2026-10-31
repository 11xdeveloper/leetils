import { describe, expect, it } from "bun:test";
import { digitOperationsToMakeTwoIntegersEqual as minOperations } from ".";

describe("3377. Digit Operations to Make Two Integers Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations(10, 12)).toBe(85);
		expect(minOperations(4, 8)).toBe(-1);
		expect(minOperations(6, 2)).toBe(-1);
	});

	it("costs just the value when nothing changes", () => {
		expect(minOperations(4, 4)).toBe(4);
	});
});
