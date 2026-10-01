import { describe, expect, it } from "bun:test";
import { countTheNumberOfConsistentStrings as countConsistentStrings } from ".";

describe("1684. Count the Number of Consistent Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countConsistentStrings("ab", ["ad", "bd", "aaab", "baa", "badab"]),
		).toBe(2);
		expect(
			countConsistentStrings("abc", ["a", "b", "c", "ab", "ac", "bc", "abc"]),
		).toBe(7);
		expect(
			countConsistentStrings("cad", [
				"cc",
				"acd",
				"b",
				"ba",
				"bac",
				"bad",
				"ac",
				"d",
			]),
		).toBe(4);
	});
});
