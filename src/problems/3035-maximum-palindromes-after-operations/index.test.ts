import { describe, expect, it } from "bun:test";
import { maximumPalindromesAfterOperations as maxPalindromesAfterOperations } from ".";

describe("3035. Maximum Palindromes After Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxPalindromesAfterOperations(["abbb", "ba", "aa"])).toBe(3);
		expect(maxPalindromesAfterOperations(["abc", "ab"])).toBe(2);
		expect(maxPalindromesAfterOperations(["cd", "ef", "a"])).toBe(1);
	});

	it("uses spare letters for odd middles", () => {
		expect(maxPalindromesAfterOperations(["a", "b", "c", "abc"])).toBe(4);
		expect(maxPalindromesAfterOperations(["aabbc", "ddeef"])).toBe(2);
	});
});
