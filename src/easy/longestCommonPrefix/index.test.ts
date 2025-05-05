import { describe, expect, it } from "bun:test";
import { longestCommonPrefix } from "./index";

describe("longestCommonPrefix", () => {
	it("should find basic common prefixes", () => {
		expect(longestCommonPrefix(["flower", "flow", "flight"])).toBe("fl");
		expect(
			longestCommonPrefix(["interspecies", "interstellar", "interstate"]),
		).toBe("inters");
	});

	it("should handle no common prefix", () => {
		expect(longestCommonPrefix(["dog", "racecar", "car"])).toBe("");
		expect(longestCommonPrefix(["cat", "dog", "rat"])).toBe("");
	});

	it("should handle empty array", () => {
		expect(longestCommonPrefix([])).toBe("");
	});

	it("should handle array with single string", () => {
		expect(longestCommonPrefix(["hello"])).toBe("hello");
		expect(longestCommonPrefix([""])).toBe("");
	});

	it("should handle strings with different lengths", () => {
		expect(longestCommonPrefix(["a", "ab", "abc"])).toBe("a");
		expect(longestCommonPrefix(["abc", "ab", "a"])).toBe("a");
	});

	it("should handle strings with no characters", () => {
		expect(longestCommonPrefix(["", "b", "c"])).toBe("");
		expect(longestCommonPrefix(["a", "", "c"])).toBe("");
	});

	it("should handle identical strings", () => {
		expect(longestCommonPrefix(["test", "test", "test"])).toBe("test");
		expect(longestCommonPrefix(["", "", ""])).toBe("");
	});

	it("should handle case sensitivity", () => {
		expect(longestCommonPrefix(["Test", "test", "testing"])).toBe("");
		expect(longestCommonPrefix(["PREFIX", "PREFix", "prefix"])).toBe("");
	});
});
