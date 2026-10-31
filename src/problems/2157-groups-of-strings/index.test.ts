import { describe, expect, it } from "bun:test";
import { groupsOfStrings } from ".";

describe("2157. Groups of Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(groupsOfStrings(["a", "b", "ab", "cde"])).toEqual([2, 3]);
		expect(groupsOfStrings(["a", "ab", "abc"])).toEqual([1, 3]);
	});

	it("groups duplicates and replacements", () => {
		expect(groupsOfStrings(["ab", "ba", "cd"])).toEqual([2, 2]);
		expect(groupsOfStrings(["abc", "abd", "xyz"])).toEqual([2, 2]);
	});
});
