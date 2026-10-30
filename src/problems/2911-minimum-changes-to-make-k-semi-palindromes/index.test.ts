import { describe, expect, it } from "bun:test";
import { minimumChangesToMakeKSemiPalindromes as minimumChanges } from ".";

describe("2911. Minimum Changes to Make K Semi-palindromes", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumChanges("abcac", 2)).toBe(1);
		expect(minimumChanges("abcdef", 2)).toBe(2);
		expect(minimumChanges("aabbaa", 3)).toBe(0);
	});
});
