import { describe, expect, it } from "bun:test";
import { checkIfMoveIsLegal as checkMove } from ".";

const board = (rows: string[]) => rows.map((row) => [...row]);

describe("1958. Check if Move is Legal", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			checkMove(
				board([
					"...B....",
					"...W....",
					"...W....",
					"...W....",
					"WBB.WWWB",
					"...B....",
					"...B....",
					"...W....",
				]),
				4,
				3,
				"B",
			),
		).toBeTrue();
		expect(
			checkMove(
				board([
					"........",
					".B..W...",
					"..W.....",
					"...WB...",
					"........",
					"....BW..",
					"......W.",
					".......B",
				]),
				4,
				4,
				"W",
			),
		).toBeFalse();
	});

	it("needs at least one opposite cell between the ends", () => {
		expect(
			checkMove(
				board([
					"BB......",
					"........",
					"........",
					"........",
					"........",
					"........",
					"........",
					"........",
				]),
				0,
				2,
				"B",
			),
		).toBeFalse();
		expect(
			checkMove(
				board([
					"BW......",
					"........",
					"........",
					"........",
					"........",
					"........",
					"........",
					"........",
				]),
				0,
				2,
				"B",
			),
		).toBeTrue();
	});
});
