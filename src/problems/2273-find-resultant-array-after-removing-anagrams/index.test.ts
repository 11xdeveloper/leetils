import { describe, expect, it } from "bun:test";
import { findResultantArrayAfterRemovingAnagrams as removeAnagrams } from ".";

describe("2273. Find Resultant Array After Removing Anagrams", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeAnagrams(["abba", "baba", "bbaa", "cd", "cd"])).toEqual([
			"abba",
			"cd",
		]);
		expect(removeAnagrams(["a", "b", "c", "d", "e"])).toEqual([
			"a",
			"b",
			"c",
			"d",
			"e",
		]);
	});
});
