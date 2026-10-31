import { describe, expect, it } from "bun:test";
import { sortVowelsInAString as sortVowels } from ".";

describe("2785. Sort Vowels in a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortVowels("lEetcOde")).toBe("lEOtcede");
		expect(sortVowels("lYmpH")).toBe("lYmpH");
	});
});
