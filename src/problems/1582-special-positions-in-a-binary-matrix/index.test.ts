import { describe, expect, it } from "bun:test";
import { specialPositionsInABinaryMatrix as numSpecial } from ".";

describe("1582. Special Positions in a Binary Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numSpecial([
				[1, 0, 0],
				[0, 0, 1],
				[1, 0, 0],
			]),
		).toBe(1);
		expect(
			numSpecial([
				[1, 0, 0],
				[0, 1, 0],
				[0, 0, 1],
			]),
		).toBe(3);
	});

	it("handles a matrix of zeros", () => {
		expect(
			numSpecial([
				[0, 0],
				[0, 0],
			]),
		).toBe(0);
	});
});
