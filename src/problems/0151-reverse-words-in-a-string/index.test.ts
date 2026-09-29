import { describe, expect, it } from "bun:test";
import { reverseWordsInAString } from ".";

describe("151. Reverse Words in a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverseWordsInAString("the sky is blue")).toBe("blue is sky the");
		expect(reverseWordsInAString("  hello world  ")).toBe("world hello");
		expect(reverseWordsInAString("a good   example")).toBe("example good a");
	});

	it("handles a single word surrounded by spaces", () => {
		expect(reverseWordsInAString("   word   ")).toBe("word");
	});

	it("keeps punctuation and digits inside words", () => {
		expect(reverseWordsInAString("it's 9 o'clock")).toBe("o'clock 9 it's");
	});
});
