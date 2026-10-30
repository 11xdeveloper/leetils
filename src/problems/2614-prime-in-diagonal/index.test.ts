import { describe, expect, it } from "bun:test";
import { primeInDiagonal as diagonalPrime } from ".";

describe("2614. Prime In Diagonal", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			diagonalPrime([
				[1, 2, 3],
				[5, 6, 7],
				[9, 10, 11],
			]),
		).toBe(11);
		expect(
			diagonalPrime([
				[1, 2, 3],
				[5, 17, 7],
				[9, 11, 10],
			]),
		).toBe(17);
	});
});
