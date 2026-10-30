import { describe, expect, it } from "bun:test";
import { wordsWithinTwoEditsOfDictionary as twoEditWords } from ".";

describe("2452. Words Within Two Edits of Dictionary", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			twoEditWords(["word", "note", "ants", "wood"], ["wood", "joke", "moat"]),
		).toEqual(["word", "note", "wood"]);
		expect(twoEditWords(["yes"], ["not"])).toEqual([]);
	});
});
