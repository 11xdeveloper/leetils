import { describe, expect, it } from "bun:test";
import { sumInAMatrix as matrixSum } from ".";

describe("2679. Sum in a Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			matrixSum([
				[7, 2, 1],
				[6, 4, 2],
				[6, 5, 3],
				[3, 2, 1],
			]),
		).toBe(15);
		expect(matrixSum([[1]])).toBe(1);
	});
});
