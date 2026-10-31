import { describe, expect, it } from "bun:test";
import { countValuesWithEquallySpacedOccurrencesI as countSpecialIntegers } from ".";

describe("4048. Count Values With Equally Spaced Occurrences I", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSpecialIntegers([1, 8, 1, 5, 1, 5, 8, 5])).toBe(2);
		expect(countSpecialIntegers([8, 8, 8, 8])).toBe(0);
		expect(countSpecialIntegers([8, 6, 6, 8, 8])).toBe(0);
	});
});
