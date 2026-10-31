import { describe, expect, it } from "bun:test";
import { smallestDivisibleDigitProductI as smallestNumber } from ".";

describe("3345. Smallest Divisible Digit Product I", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestNumber(10, 2)).toBe(10);
		expect(smallestNumber(15, 3)).toBe(16);
	});
});
