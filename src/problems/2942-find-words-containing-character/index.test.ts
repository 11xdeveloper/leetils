import { describe, expect, it } from "bun:test";
import { findWordsContainingCharacter as findWordsContaining } from ".";

describe("2942. Find Words Containing Character", () => {
	it("solves the examples from the problem statement", () => {
		expect(findWordsContaining(["leet", "code"], "e")).toEqual([0, 1]);
		expect(findWordsContaining(["abc", "bcd", "aaaa", "cbc"], "a")).toEqual([
			0, 2,
		]);
		expect(findWordsContaining(["abc", "bcd", "aaaa", "cbc"], "z")).toEqual([]);
	});
});
