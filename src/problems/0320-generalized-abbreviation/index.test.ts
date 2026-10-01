import { describe, expect, it } from "bun:test";
import { generalizedAbbreviation } from ".";

/** Expands an abbreviation back into a pattern of known and hidden letters. */
const expand = (abbreviation: string): string =>
	abbreviation.replaceAll(/\d+/g, (digits) => "?".repeat(Number(digits)));

describe("320. Generalized Abbreviation", () => {
	it("solves the examples from the problem statement", () => {
		expect(generalizedAbbreviation("word").toSorted()).toEqual(
			[
				"4",
				"3d",
				"2r1",
				"2rd",
				"1o2",
				"1o1d",
				"1or1",
				"1ord",
				"w3",
				"w2d",
				"w1r1",
				"w1rd",
				"wo2",
				"wo1d",
				"wor1",
				"word",
			].toSorted(),
		);
		expect(generalizedAbbreviation("a").toSorted()).toEqual(["1", "a"]);
	});

	it("returns 2^n distinct abbreviations that each match the word", () => {
		const word = "abcdefgh";
		const abbreviations = generalizedAbbreviation(word);
		expect(abbreviations).toHaveLength(2 ** word.length);
		expect(new Set(abbreviations).size).toBe(abbreviations.length);
		for (const abbreviation of abbreviations) {
			const pattern = expand(abbreviation);
			expect(pattern).toHaveLength(word.length);
			expect(
				[...pattern].every((char, i) => char === "?" || char === word[i]),
			).toBeTrue();
			expect(abbreviation).not.toMatch(/\d\d/);
		}
	});
});
