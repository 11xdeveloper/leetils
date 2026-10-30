import { describe, expect, it } from "bun:test";
import { countSubstringsWithoutRepeatingCharacter as numberOfSpecialSubstrings } from ".";

describe("2743. Count Substrings Without Repeating Character", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfSpecialSubstrings("abcd")).toBe(10);
		expect(numberOfSpecialSubstrings("ooo")).toBe(3);
		expect(numberOfSpecialSubstrings("abab")).toBe(7);
	});
});
