import { describe, expect, it } from "bun:test";
import { checkDivisibilityByDigitSumAndProduct as checkDivisibility } from ".";

describe("3622. Check Divisibility by Digit Sum and Product", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkDivisibility(99)).toBeTrue();
		expect(checkDivisibility(23)).toBeFalse();
	});
});
