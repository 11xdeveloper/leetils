import { describe, expect, it } from "bun:test";
import { trimTrailingVowels } from ".";

describe("3856. Trim Trailing Vowels", () => {
	it("solves the examples from the problem statement", () => {
		expect(trimTrailingVowels("idea")).toBe("id");
		expect(trimTrailingVowels("day")).toBe("day");
		expect(trimTrailingVowels("aeiou")).toBe("");
	});
});
