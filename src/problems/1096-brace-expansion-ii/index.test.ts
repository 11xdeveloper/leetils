import { describe, expect, it } from "bun:test";
import { braceExpansionII } from ".";

describe("1096. Brace Expansion II", () => {
	it("solves the examples from the problem statement", () => {
		expect(braceExpansionII("{a,b}{c,{d,e}}")).toEqual([
			"ac",
			"ad",
			"ae",
			"bc",
			"bd",
			"be",
		]);
		expect(braceExpansionII("{{a,z},a{b,c},{ab,z}}")).toEqual([
			"a",
			"ab",
			"ac",
			"z",
		]);
	});

	it("handles plain words, nesting and repeated letters", () => {
		expect(braceExpansionII("abc")).toEqual(["abc"]);
		expect(braceExpansionII("{a,{a,{a}}}")).toEqual(["a"]);
		expect(braceExpansionII("a{b,c}{d,e}f")).toEqual([
			"abdf",
			"abef",
			"acdf",
			"acef",
		]);
		expect(braceExpansionII("{a,b}{a,b}")).toEqual(["aa", "ab", "ba", "bb"]);
	});
});
