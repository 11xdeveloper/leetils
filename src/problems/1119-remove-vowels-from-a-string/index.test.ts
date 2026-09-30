import { describe, expect, it } from "bun:test";
import { removeVowelsFromAString as removeVowels } from ".";

describe("1119. Remove Vowels from a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeVowels("leetcodeisacommunityforcoders")).toBe(
			"ltcdscmmntyfrcdrs",
		);
		expect(removeVowels("aeiou")).toBe("");
	});

	it("keeps every consonant, including y", () => {
		expect(removeVowels("abcdefghijklmnopqrstuvwxyz")).toBe(
			"bcdfghjklmnpqrstvwxyz",
		);
	});
});
