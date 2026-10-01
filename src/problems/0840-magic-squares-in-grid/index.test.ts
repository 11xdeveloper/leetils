import { describe, expect, it } from "bun:test";
import { permutations } from "../0046-permutations";
import { magicSquaresInGrid as numMagicSquaresInside } from ".";

describe("840. Magic Squares In Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numMagicSquaresInside([
				[4, 3, 8, 4],
				[9, 5, 1, 9],
				[2, 7, 6, 2],
			]),
		).toBe(1);
		expect(numMagicSquaresInside([[8]])).toBe(0);
	});

	it("recognises exactly the 8 magic squares among all arrangements of 1 to 9", () => {
		let found = 0;
		for (const values of permutations([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
			found += numMagicSquaresInside([
				values.slice(0, 3),
				values.slice(3, 6),
				values.slice(6),
			]);
		}
		expect(found).toBe(8);
	});

	it("rejects squares that repeat or skip numbers", () => {
		expect(
			numMagicSquaresInside([
				[5, 5, 5],
				[5, 5, 5],
				[5, 5, 5],
			]),
		).toBe(0);
		expect(
			numMagicSquaresInside([
				[10, 3, 2],
				[1, 5, 9],
				[4, 7, 0],
			]),
		).toBe(0);
	});
});
