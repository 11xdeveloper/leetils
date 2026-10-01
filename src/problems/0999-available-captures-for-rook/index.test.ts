import { describe, expect, it } from "bun:test";
import { availableCapturesForRook as numRookCaptures } from ".";

const board = (rows: string[]): string[][] => rows.map((row) => [...row]);

describe("999. Available Captures for Rook", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numRookCaptures(
				board([
					"........",
					"...p....",
					"...R...p",
					"........",
					"........",
					"...p....",
					"........",
					"........",
				]),
			),
		).toBe(3);
		expect(
			numRookCaptures(
				board([
					"........",
					".pppppp.",
					".ppBpp..",
					".pBRBp..",
					".ppBpp..",
					".pppppp.",
					"........",
					"........",
				]),
			),
		).toBe(0);
		expect(
			numRookCaptures(
				board([
					"........",
					"...p....",
					"...p....",
					"pp.R.pB.",
					"........",
					"...B....",
					"...p....",
					"........",
				]),
			),
		).toBe(3);
	});
});
