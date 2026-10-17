import { describe, expect, it } from "bun:test";
import { checkIfWordCanBePlacedInCrossword as canPlaceWord } from ".";

describe("2018. Check if Word Can Be Placed In Crossword", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			canPlaceWord(
				[
					["#", " ", "#"],
					[" ", " ", "#"],
					["#", "c", " "],
				],
				"abc",
			),
		).toBeTrue();
		expect(
			canPlaceWord(
				[
					[" ", "#", "a"],
					[" ", "#", "c"],
					[" ", "#", "a"],
				],
				"ac",
			),
		).toBeFalse();
		expect(
			canPlaceWord(
				[
					["#", " ", "#"],
					[" ", " ", "#"],
					["#", " ", "c"],
				],
				"ca",
			),
		).toBeTrue();
	});

	it("places words right to left", () => {
		expect(canPlaceWord([["c", " ", " "]], "abc")).toBeTrue();
		expect(canPlaceWord([["c", " ", " "]], "abd")).toBeFalse();
	});
});
