import { describe, expect, it } from "bun:test";
import { rowWithMaximumOnes as rowAndMaximumOnes } from ".";

describe("2643. Row With Maximum Ones", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			rowAndMaximumOnes([
				[0, 1],
				[1, 0],
			]),
		).toEqual([0, 1]);
		expect(
			rowAndMaximumOnes([
				[0, 0, 0],
				[0, 1, 1],
			]),
		).toEqual([1, 2]);
		expect(
			rowAndMaximumOnes([
				[0, 0],
				[1, 1],
				[0, 0],
			]),
		).toEqual([1, 2]);
	});
});
