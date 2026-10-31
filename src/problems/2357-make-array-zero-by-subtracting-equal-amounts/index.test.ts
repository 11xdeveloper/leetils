import { describe, expect, it } from "bun:test";
import { makeArrayZeroBySubtractingEqualAmounts as minimumOperations } from ".";

describe("2357. Make Array Zero by Subtracting Equal Amounts", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumOperations([1, 5, 0, 3, 5])).toBe(3);
		expect(minimumOperations([0])).toBe(0);
	});
});
