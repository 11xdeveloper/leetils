import { describe, expect, it } from "bun:test";
import { expressiveWords } from ".";

describe("809. Expressive Words", () => {
	it("solves the examples from the problem statement", () => {
		expect(expressiveWords("heeellooo", ["hello", "hi", "helo"])).toBe(1);
		expect(expressiveWords("zzzzzyyyyy", ["zzyy", "zy", "zyy"])).toBe(3);
	});

	it("rejects stretching a group to only two letters", () => {
		expect(expressiveWords("aab", ["ab"])).toBe(0);
		expect(expressiveWords("aaab", ["ab", "aab", "aaaab"])).toBe(2);
	});
});
