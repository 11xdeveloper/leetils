import { describe, expect, it } from "bun:test";
import { splitMessageBasedOnLimit as splitMessage } from ".";

describe("2468. Split Message Based on Limit", () => {
	it("solves the examples from the problem statement", () => {
		expect(splitMessage("this is really a very awesome message", 9)).toEqual([
			"thi<1/14>",
			"s i<2/14>",
			"s r<3/14>",
			"eal<4/14>",
			"ly <5/14>",
			"a v<6/14>",
			"ery<7/14>",
			" aw<8/14>",
			"eso<9/14>",
			"me<10/14>",
			" m<11/14>",
			"es<12/14>",
			"sa<13/14>",
			"ge<14/14>",
		]);
		expect(splitMessage("short message", 15)).toEqual([
			"short mess<1/2>",
			"age<2/2>",
		]);
	});

	it("returns nothing when no split fits", () => {
		expect(splitMessage("abc", 5)).toEqual([]);
	});
});
