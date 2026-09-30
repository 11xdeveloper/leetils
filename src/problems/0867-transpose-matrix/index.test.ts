import { describe, expect, it } from "bun:test";
import { transposeMatrix as transpose } from ".";

describe("867. Transpose Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			transpose([
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]),
		).toEqual([
			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9],
		]);
		expect(
			transpose([
				[1, 2, 3],
				[4, 5, 6],
			]),
		).toEqual([
			[1, 4],
			[2, 5],
			[3, 6],
		]);
	});

	it("gives back the original when applied twice", () => {
		const matrix = [
			[1, 2],
			[3, 4],
			[5, 6],
			[7, 8],
		];
		expect(transpose(transpose(matrix))).toEqual(matrix);
	});
});
