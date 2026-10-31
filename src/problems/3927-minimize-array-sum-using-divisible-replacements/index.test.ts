import { describe, expect, it } from "bun:test";
import { minimizeArraySumUsingDivisibleReplacements as minArraySum } from ".";

describe("3927. Minimize Array Sum Using Divisible Replacements", () => {
	it("solves the examples from the problem statement", () => {
		expect(minArraySum([3, 6, 2])).toBe(7);
		expect(minArraySum([4, 2, 8, 3])).toBe(9);
		expect(minArraySum([7, 5, 9])).toBe(21);
	});
});
