import { describe, expect, it } from "bun:test";
import { countTheNumberOfSpecialCharactersI as numberOfSpecialChars } from ".";

describe("3120. Count the Number of Special Characters I", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfSpecialChars("aaAbcBC")).toBe(3);
		expect(numberOfSpecialChars("abc")).toBe(0);
		expect(numberOfSpecialChars("abBCab")).toBe(1);
	});
});
