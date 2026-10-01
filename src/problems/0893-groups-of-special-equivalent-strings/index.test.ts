import { describe, expect, it } from "bun:test";
import { groupsOfSpecialEquivalentStrings as numSpecialEquivGroups } from ".";

describe("893. Groups of Special-Equivalent Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numSpecialEquivGroups(["abcd", "cdab", "cbad", "xyzz", "zzxy", "zzyx"]),
		).toBe(3);
		expect(
			numSpecialEquivGroups(["abc", "acb", "bac", "bca", "cab", "cba"]),
		).toBe(3);
	});
});
