import { describe, expect, it } from "bun:test";
import { findTheArrayConcatenationValue as concatenationValue } from ".";

describe("2562. Find the Array Concatenation Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(concatenationValue([7, 52, 2, 4])).toBe(596);
		expect(concatenationValue([5, 14, 13, 8, 12])).toBe(673);
	});
});
