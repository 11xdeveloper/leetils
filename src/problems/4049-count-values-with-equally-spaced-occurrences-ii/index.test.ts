import { describe, expect, it } from "bun:test";
import { countValuesWithEquallySpacedOccurrencesII as countSpecialIntegers } from ".";

describe("4049. Count Values With Equally Spaced Occurrences II", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSpecialIntegers([1, 8, 1, 5, 1, 5, 8, 5])).toBe(2);
		expect(countSpecialIntegers([8, 8, 8, 8])).toBe(1);
		expect(countSpecialIntegers([8, 6, 6, 8, 8])).toBe(0);
	});
});
