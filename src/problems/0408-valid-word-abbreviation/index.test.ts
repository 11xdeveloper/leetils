import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { generalizedAbbreviation } from "../0320-generalized-abbreviation";
import { validWordAbbreviation } from ".";

describe("408. Valid Word Abbreviation", () => {
	it("solves the examples from the problem statement", () => {
		expect(validWordAbbreviation("internationalization", "i12iz4n")).toBeTrue();
		expect(validWordAbbreviation("apple", "a2e")).toBeFalse();
	});

	it("rejects leading zeros, empty skips and overruns", () => {
		expect(validWordAbbreviation("substitution", "s010n")).toBeFalse();
		expect(validWordAbbreviation("substitution", "s0ubstitution")).toBeFalse();
		expect(validWordAbbreviation("a", "2")).toBeFalse();
	});

	it("accepts exactly the generalized abbreviations of random words", () => {
		const random = createRandom(408);
		for (let run = 0; run < 100; run++) {
			const word = random.string(random.int(1, 6), "ab");
			const valid = new Set(generalizedAbbreviation(word));
			for (const abbr of valid)
				expect(validWordAbbreviation(word, abbr)).toBeTrue();
			for (let i = 0; i < 20; i++) {
				const abbr = random.string(random.int(1, 5), "ab123");
				// Adjacent numbers merge when read, so only compare abbreviations with single-digit runs.
				if (/\d\d/.test(abbr)) continue;
				expect(validWordAbbreviation(word, abbr)).toBe(valid.has(abbr));
			}
		}
	});
});
