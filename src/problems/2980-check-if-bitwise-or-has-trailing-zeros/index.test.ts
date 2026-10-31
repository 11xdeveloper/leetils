import { describe, expect, it } from "bun:test";
import { checkIfBitwiseOrHasTrailingZeros as hasTrailingZeros } from ".";

describe("2980. Check if Bitwise OR Has Trailing Zeros", () => {
	it("solves the examples from the problem statement", () => {
		expect(hasTrailingZeros([1, 2, 3, 4, 5])).toBe(true);
		expect(hasTrailingZeros([2, 4, 8, 16])).toBe(true);
		expect(hasTrailingZeros([1, 3, 5, 7, 9])).toBe(false);
	});
});
