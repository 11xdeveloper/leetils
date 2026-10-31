import { describe, expect, it } from "bun:test";
import { countTheNumberOfSpecialCharactersII as numberOfSpecialChars } from ".";

describe("3121. Count the Number of Special Characters II", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfSpecialChars("aaAbcBC")).toBe(3);
		expect(numberOfSpecialChars("abc")).toBe(0);
		expect(numberOfSpecialChars("AbBCab")).toBe(0);
	});
});
