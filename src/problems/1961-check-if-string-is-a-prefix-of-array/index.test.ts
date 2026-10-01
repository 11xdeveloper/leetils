import { describe, expect, it } from "bun:test";
import { checkIfStringIsAPrefixOfArray as isPrefixString } from ".";

describe("1961. Check If String Is a Prefix of Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isPrefixString("iloveleetcode", ["i", "love", "leetcode", "apples"]),
		).toBeTrue();
		expect(
			isPrefixString("iloveleetcode", ["apples", "i", "love", "leetcode"]),
		).toBeFalse();
	});

	it("rejects a string longer than all the words together", () => {
		expect(isPrefixString("abc", ["a", "b"])).toBeFalse();
		expect(isPrefixString("ab", ["abc"])).toBeFalse();
	});
});
