import { describe, expect, it } from "bun:test";
import { removeAllOnesWithRowAndColumnFlips as removeOnes } from ".";

describe("2128. Remove All Ones With Row and Column Flips", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			removeOnes([
				[0, 1, 0],
				[1, 0, 1],
				[0, 1, 0],
			]),
		).toBeTrue();
		expect(
			removeOnes([
				[1, 1, 0],
				[0, 0, 0],
				[0, 0, 0],
			]),
		).toBeFalse();
		expect(removeOnes([[0]])).toBeTrue();
	});
});
