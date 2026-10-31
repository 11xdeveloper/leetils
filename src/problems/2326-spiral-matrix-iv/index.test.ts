import { describe, expect, it } from "bun:test";
import { listFromArray } from "../../structures/list-node";
import { spiralMatrixIV as spiralMatrix } from ".";

describe("2326. Spiral Matrix IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			spiralMatrix(
				3,
				5,
				listFromArray([3, 0, 2, 6, 8, 1, 7, 9, 4, 2, 5, 5, 0]),
			),
		).toEqual([
			[3, 0, 2, 6, 8],
			[5, 0, -1, -1, 1],
			[5, 2, 4, 9, 7],
		]);
		expect(spiralMatrix(1, 4, listFromArray([0, 1, 2]))).toEqual([
			[0, 1, 2, -1],
		]);
	});
});
