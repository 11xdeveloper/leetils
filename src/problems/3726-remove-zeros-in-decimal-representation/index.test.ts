import { describe, expect, it } from "bun:test";
import { removeZerosInDecimalRepresentation as removeZeros } from ".";

describe("3726. Remove Zeros in Decimal Representation", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeZeros(1020030)).toBe(123);
		expect(removeZeros(1)).toBe(1);
	});
});
