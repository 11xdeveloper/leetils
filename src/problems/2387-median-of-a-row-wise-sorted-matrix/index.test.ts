import { describe, expect, it } from "bun:test";
import { medianOfARowWiseSortedMatrix as matrixMedian } from ".";

describe("2387. Median of a Row Wise Sorted Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			matrixMedian([
				[1, 1, 2],
				[2, 3, 3],
				[1, 3, 4],
			]),
		).toBe(2);
		expect(matrixMedian([[1, 1, 3, 3, 4]])).toBe(3);
	});
});
