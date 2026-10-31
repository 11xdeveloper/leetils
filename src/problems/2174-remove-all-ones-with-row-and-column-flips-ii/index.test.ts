import { describe, expect, it } from "bun:test";
import { removeAllOnesWithRowAndColumnFlipsII as removeOnes } from ".";

describe("2174. Remove All Ones With Row and Column Flips II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			removeOnes([
				[1, 1, 1],
				[1, 1, 1],
				[0, 1, 0],
			]),
		).toBe(2);
		expect(
			removeOnes([
				[0, 1, 0],
				[1, 0, 1],
				[0, 1, 0],
			]),
		).toBe(2);
		expect(
			removeOnes([
				[0, 0],
				[0, 0],
			]),
		).toBe(0);
	});

	it("needs one operation per isolated diagonal 1", () => {
		expect(
			removeOnes([
				[1, 0, 0],
				[0, 1, 0],
				[0, 0, 1],
			]),
		).toBe(3);
	});
});
