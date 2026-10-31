import { describe, expect, it } from "bun:test";
import { checkWhetherTwoStringsAreAlmostEquivalent as almostEquivalent } from ".";

describe("2068. Check Whether Two Strings are Almost Equivalent", () => {
	it("solves the examples from the problem statement", () => {
		expect(almostEquivalent("aaaa", "bccb")).toBeFalse();
		expect(almostEquivalent("abcdeef", "abaaacc")).toBeTrue();
		expect(almostEquivalent("cccddabba", "babababab")).toBeTrue();
	});
});
