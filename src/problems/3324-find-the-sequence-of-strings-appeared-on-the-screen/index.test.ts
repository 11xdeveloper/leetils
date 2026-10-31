import { describe, expect, it } from "bun:test";
import { findTheSequenceOfStringsAppearedOnTheScreen as stringSequence } from ".";

describe("3324. Find the Sequence of Strings Appeared on the Screen", () => {
	it("solves the examples from the problem statement", () => {
		expect(stringSequence("abc")).toEqual([
			"a",
			"aa",
			"ab",
			"aba",
			"abb",
			"abc",
		]);
		expect(stringSequence("he")).toEqual([
			"a",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
			"ha",
			"hb",
			"hc",
			"hd",
			"he",
		]);
	});
});
