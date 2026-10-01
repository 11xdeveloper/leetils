import { describe, expect, it } from "bun:test";
import { numberOfDifferentIntegersInAString as numDifferentIntegers } from ".";

describe("1805. Number of Different Integers in a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(numDifferentIntegers("a123bc34d8ef34")).toBe(3);
		expect(numDifferentIntegers("leet1234code234")).toBe(2);
		expect(numDifferentIntegers("a1b01c001")).toBe(1);
	});

	it("handles zeros and very long numbers", () => {
		expect(numDifferentIntegers("0a00b000")).toBe(1);
		expect(numDifferentIntegers(`${"9".repeat(30)}x${"9".repeat(29)}8`)).toBe(
			2,
		);
	});
});
