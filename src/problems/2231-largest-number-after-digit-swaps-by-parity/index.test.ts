import { describe, expect, it } from "bun:test";
import { largestNumberAfterDigitSwapsByParity as largestInteger } from ".";

describe("2231. Largest Number After Digit Swaps by Parity", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestInteger(1234)).toBe(3412);
		expect(largestInteger(65875)).toBe(87655);
	});
});
