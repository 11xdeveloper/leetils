import { describe, expect, it } from "bun:test";
import { firstMatchingCharacterFromBothEnds as firstMatchingIndex } from ".";

describe("3884. First Matching Character From Both Ends", () => {
	it("solves the examples from the problem statement", () => {
		expect(firstMatchingIndex("abcacbd")).toBe(1);
		expect(firstMatchingIndex("abc")).toBe(1);
		expect(firstMatchingIndex("abcdab")).toBe(-1);
	});
});
