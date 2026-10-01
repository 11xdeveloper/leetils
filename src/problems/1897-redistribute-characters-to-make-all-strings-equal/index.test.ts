import { describe, expect, it } from "bun:test";
import { redistributeCharactersToMakeAllStringsEqual as makeEqual } from ".";

describe("1897. Redistribute Characters to Make All Strings Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeEqual(["abc", "aabc", "bc"])).toBeTrue();
		expect(makeEqual(["ab", "a"])).toBeFalse();
	});
});
