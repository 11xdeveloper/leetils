import { describe, expect, it } from "bun:test";
import { longestCommonPrefix } from ".";

describe("14. Longest Common Prefix", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestCommonPrefix(["flower", "flow", "flight"])).toBe("fl");
		expect(longestCommonPrefix(["dog", "racecar", "car"])).toBe("");
	});

	it("returns the whole string when there is only one", () => {
		expect(longestCommonPrefix(["hello"])).toBe("hello");
		expect(longestCommonPrefix([""])).toBe("");
	});

	it("is limited by the shortest string, wherever it is", () => {
		expect(longestCommonPrefix(["a", "ab", "abc"])).toBe("a");
		expect(longestCommonPrefix(["abc", "ab", "a"])).toBe("a");
		expect(longestCommonPrefix(["abc", "abcd", "ab"])).toBe("ab");
	});

	it("returns an empty prefix when any string is empty", () => {
		expect(longestCommonPrefix(["", "b", "c"])).toBe("");
		expect(longestCommonPrefix(["a", "", "a"])).toBe("");
	});

	it("returns the whole string when all strings are identical", () => {
		expect(longestCommonPrefix(["test", "test", "test"])).toBe("test");
	});

	it("finds longer prefixes", () => {
		expect(
			longestCommonPrefix(["interspecies", "interstellar", "interstate"]),
		).toBe("inters");
	});
});
