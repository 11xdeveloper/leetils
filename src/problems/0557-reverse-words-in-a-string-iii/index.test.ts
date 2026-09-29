import { describe, expect, it } from "bun:test";
import { reverseWordsInAStringIII as reverseWords } from ".";

describe("557. Reverse Words in a String III", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverseWords("Let's take LeetCode contest")).toBe(
			"s'teL ekat edoCteeL tsetnoc",
		);
		expect(reverseWords("Mr Ding")).toBe("rM gniD");
	});

	it("handles a single word", () => {
		expect(reverseWords("a")).toBe("a");
		expect(reverseWords("abc")).toBe("cba");
	});
});
