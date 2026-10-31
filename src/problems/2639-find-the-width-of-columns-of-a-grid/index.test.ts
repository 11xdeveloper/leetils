import { describe, expect, it } from "bun:test";
import { findTheWidthOfColumnsOfAGrid as findColumnWidth } from ".";

describe("2639. Find the Width of Columns of a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(findColumnWidth([[1], [22], [333]])).toEqual([3]);
		expect(
			findColumnWidth([
				[-15, 1, 3],
				[15, 7, 12],
				[5, 6, -2],
			]),
		).toEqual([3, 1, 2]);
	});
});
