import { describe, expect, it } from "bun:test";
import { appendCharactersToStringToMakeSubsequence as appendCharacters } from ".";

describe("2486. Append Characters to String to Make Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(appendCharacters("coaching", "coding")).toBe(4);
		expect(appendCharacters("abcde", "a")).toBe(0);
		expect(appendCharacters("z", "abcde")).toBe(5);
	});
});
