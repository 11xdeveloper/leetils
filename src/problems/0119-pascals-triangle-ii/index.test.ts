import { describe, expect, it } from "bun:test";
import { pascalsTriangle } from "../0118-pascals-triangle";
import { pascalsTriangleII } from ".";

describe("119. Pascal's Triangle II", () => {
	it("solves the examples from the problem statement", () => {
		expect(pascalsTriangleII(3)).toEqual([1, 3, 3, 1]);
		expect(pascalsTriangleII(0)).toEqual([1]);
		expect(pascalsTriangleII(1)).toEqual([1, 1]);
	});

	it("matches the rows of Pascal's Triangle up to the constraint of 33", () => {
		const rows = pascalsTriangle(34);
		for (let rowIndex = 0; rowIndex <= 33; rowIndex++) {
			expect(pascalsTriangleII(rowIndex)).toEqual(rows[rowIndex] ?? []);
		}
	});
});
