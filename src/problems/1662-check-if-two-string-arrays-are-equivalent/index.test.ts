import { describe, expect, it } from "bun:test";
import { checkIfTwoStringArraysAreEquivalent as arrayStringsAreEqual } from ".";

describe("1662. Check If Two String Arrays are Equivalent", () => {
	it("solves the examples from the problem statement", () => {
		expect(arrayStringsAreEqual(["ab", "c"], ["a", "bc"])).toBeTrue();
		expect(arrayStringsAreEqual(["a", "cb"], ["ab", "c"])).toBeFalse();
		expect(arrayStringsAreEqual(["abc", "d", "defg"], ["abcddefg"])).toBeTrue();
	});
});
