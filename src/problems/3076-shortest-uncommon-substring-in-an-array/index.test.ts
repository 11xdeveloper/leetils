import { describe, expect, it } from "bun:test";
import { shortestUncommonSubstringInAnArray as shortestSubstrings } from ".";

describe("3076. Shortest Uncommon Substring in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestSubstrings(["cab", "ad", "bad", "c"])).toEqual([
			"ab",
			"",
			"ba",
			"",
		]);
		expect(shortestSubstrings(["abc", "bcd", "abcd"])).toEqual([
			"",
			"",
			"abcd",
		]);
	});

	it("handles repeated strings", () => {
		expect(shortestSubstrings(["aa", "aa"])).toEqual(["", ""]);
		expect(shortestSubstrings(["a"])).toEqual(["a"]);
	});
});
