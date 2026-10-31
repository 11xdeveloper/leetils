import { describe, expect, it } from "bun:test";
import { substringsThatBeginAndEndWithTheSameLetter as sameEndSubstrings } from ".";

describe("2083. Substrings That Begin and End With the Same Letter", () => {
	it("solves the examples from the problem statement", () => {
		expect(sameEndSubstrings("abcba")).toBe(7);
		expect(sameEndSubstrings("abacad")).toBe(9);
		expect(sameEndSubstrings("a")).toBe(1);
	});
});
