import { describe, expect, it } from "bun:test";
import { buildAMatrixWithConditions as buildMatrix } from ".";

const expectValid = (
	k: number,
	rowConditions: number[][],
	colConditions: number[][],
	matrix: number[][],
): void => {
	const where = new Map<number, [number, number]>();
	for (const [r, row] of matrix.entries())
		for (const [c, value] of row.entries()) if (value) where.set(value, [r, c]);
	expect(where.size).toBe(k);
	for (const [a = 0, b = 0] of rowConditions)
		expect(where.get(a)?.[0] ?? 0).toBeLessThan(where.get(b)?.[0] ?? 0);
	for (const [a = 0, b = 0] of colConditions)
		expect(where.get(a)?.[1] ?? 0).toBeLessThan(where.get(b)?.[1] ?? 0);
};

describe("2392. Build a Matrix With Conditions", () => {
	it("solves the examples from the problem statement", () => {
		const rows = [
			[1, 2],
			[3, 2],
		];
		const cols = [
			[2, 1],
			[3, 2],
		];
		expectValid(3, rows, cols, buildMatrix(3, rows, cols));
		expect(
			buildMatrix(
				3,
				[
					[1, 2],
					[2, 3],
					[3, 1],
					[2, 3],
				],
				[[2, 1]],
			),
		).toEqual([]);
	});
});
