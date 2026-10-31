import { describe, expect, it } from "bun:test";
import { equalRowAndColumnPairs as equalPairs } from ".";

describe("2352. Equal Row and Column Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			equalPairs([
				[3, 2, 1],
				[1, 7, 6],
				[2, 7, 7],
			]),
		).toBe(1);
		expect(
			equalPairs([
				[3, 1, 2, 2],
				[1, 4, 4, 5],
				[2, 4, 2, 2],
				[2, 4, 2, 2],
			]),
		).toBe(3);
	});

	it("keeps multi-digit values apart", () => {
		// Row [11, 1] and column [1, 11] would both read "111" unseparated.
		expect(
			equalPairs([
				[11, 1],
				[2, 11],
			]),
		).toBe(0);
	});
});
