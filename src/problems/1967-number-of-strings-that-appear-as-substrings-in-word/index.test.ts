import { describe, expect, it } from "bun:test";
import { numberOfStringsThatAppearAsSubstringsInWord as numOfStrings } from ".";

describe("1967. Number of Strings That Appear as Substrings in Word", () => {
	it("solves the examples from the problem statement", () => {
		expect(numOfStrings(["a", "abc", "bc", "d"], "abc")).toBe(3);
		expect(numOfStrings(["a", "b", "c"], "aaaaabbbbb")).toBe(2);
		expect(numOfStrings(["a", "a", "a"], "ab")).toBe(3);
	});
});
