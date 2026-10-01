import { describe, expect, it } from "bun:test";
import { largestMagicSquare } from ".";

describe("1895. Largest Magic Square", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			largestMagicSquare([
				[7, 1, 4, 5, 6],
				[2, 5, 1, 6, 4],
				[1, 5, 4, 3, 2],
				[1, 2, 7, 3, 4],
			]),
		).toBe(3);
		expect(
			largestMagicSquare([
				[5, 1, 3, 1],
				[9, 3, 3, 1],
				[1, 3, 3, 8],
			]),
		).toBe(2);
	});

	it("finds a classic 3 × 3 magic square", () => {
		expect(
			largestMagicSquare([
				[2, 7, 6],
				[9, 5, 1],
				[4, 3, 8],
			]),
		).toBe(3);
		expect(
			largestMagicSquare([
				[1, 2],
				[3, 4],
			]),
		).toBe(1);
	});
});
