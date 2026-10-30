import { describe, expect, it } from "bun:test";
import { differenceBetweenOnesAndZerosInRowAndColumn as onesMinusZeros } from ".";

describe("2482. Difference Between Ones and Zeros in Row and Column", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			onesMinusZeros([
				[0, 1, 1],
				[1, 0, 1],
				[0, 0, 1],
			]),
		).toEqual([
			[0, 0, 4],
			[0, 0, 4],
			[-2, -2, 2],
		]);
		expect(
			onesMinusZeros([
				[1, 1, 1],
				[1, 1, 1],
			]),
		).toEqual([
			[5, 5, 5],
			[5, 5, 5],
		]);
	});
});
