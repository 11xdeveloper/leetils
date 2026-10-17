import { describe, expect, it } from "bun:test";
import { vowelsOfAllSubstrings as countVowels } from ".";

describe("2063. Vowels of All Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(countVowels("aba")).toBe(6);
		expect(countVowels("abc")).toBe(3);
		expect(countVowels("ltcd")).toBe(0);
	});

	it("handles long strings without overflow", () => {
		const n = 100_000;
		// Sum over i of (i + 1)(n - i) = n(n + 1)(n + 2) / 6.
		expect(countVowels("a".repeat(n))).toBe((n * (n + 1) * (n + 2)) / 6);
	});
});
