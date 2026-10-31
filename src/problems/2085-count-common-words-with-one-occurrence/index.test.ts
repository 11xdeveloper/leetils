import { describe, expect, it } from "bun:test";
import { countCommonWordsWithOneOccurrence as countWords } from ".";

describe("2085. Count Common Words With One Occurrence", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countWords(
				["leetcode", "is", "amazing", "as", "is"],
				["amazing", "leetcode", "is"],
			),
		).toBe(2);
		expect(countWords(["b", "bb", "bbb"], ["a", "aa", "aaa"])).toBe(0);
		expect(countWords(["a", "ab"], ["a", "a", "a", "ab"])).toBe(1);
	});
});
