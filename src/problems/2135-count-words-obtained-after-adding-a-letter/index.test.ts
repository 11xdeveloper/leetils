import { describe, expect, it } from "bun:test";
import { countWordsObtainedAfterAddingALetter as wordCount } from ".";

describe("2135. Count Words Obtained After Adding a Letter", () => {
	it("solves the examples from the problem statement", () => {
		expect(wordCount(["ant", "act", "tack"], ["tack", "act", "acti"])).toBe(2);
		expect(wordCount(["ab", "a"], ["abc", "abcd"])).toBe(1);
	});
});
