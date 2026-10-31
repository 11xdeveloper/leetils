import { describe, expect, it } from "bun:test";
import { extraCharactersInAString as minExtraChar } from ".";

describe("2707. Extra Characters in a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(minExtraChar("leetscode", ["leet", "code", "leetcode"])).toBe(1);
		expect(minExtraChar("sayhelloworld", ["hello", "world"])).toBe(3);
	});
});
