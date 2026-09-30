import { describe, expect, it } from "bun:test";
import { mostCommonWord } from ".";

describe("819. Most Common Word", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			mostCommonWord(
				"Bob hit a ball, the hit BALL flew far after it was hit.",
				["hit"],
			),
		).toBe("ball");
		expect(mostCommonWord("a.", [])).toBe("a");
	});

	it("treats punctuation as a separator", () => {
		expect(mostCommonWord("a, a, a, a, b,b,b,c, c", ["a"])).toBe("b");
	});
});
