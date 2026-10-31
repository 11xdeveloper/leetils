import { describe, expect, it } from "bun:test";
import { countTheNumberOfVowelStringsInRange as vowelStrings } from ".";

describe("2586. Count the Number of Vowel Strings in Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(vowelStrings(["are", "amy", "u"], 0, 2)).toBe(2);
		expect(vowelStrings(["hey", "aeo", "mu", "ooo", "artro"], 1, 4)).toBe(3);
	});
});
