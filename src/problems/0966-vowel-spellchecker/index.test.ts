import { describe, expect, it } from "bun:test";
import { vowelSpellchecker as spellchecker } from ".";

describe("966. Vowel Spellchecker", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			spellchecker(
				["KiTe", "kite", "hare", "Hare"],
				[
					"kite",
					"Kite",
					"KiTe",
					"Hare",
					"HARE",
					"Hear",
					"hear",
					"keti",
					"keet",
					"keto",
				],
			),
		).toEqual([
			"kite",
			"KiTe",
			"KiTe",
			"Hare",
			"hare",
			"",
			"",
			"KiTe",
			"",
			"KiTe",
		]);
		expect(spellchecker(["yellow"], ["YellOw"])).toEqual(["yellow"]);
	});
});
