import { describe, expect, it } from "bun:test";
import { rearrangeWordsInASentence as arrangeWords } from ".";

describe("1451. Rearrange Words in a Sentence", () => {
	it("solves the examples from the problem statement", () => {
		expect(arrangeWords("Leetcode is cool")).toBe("Is cool leetcode");
		expect(arrangeWords("Keep calm and code on")).toBe("On and keep calm code");
		expect(arrangeWords("To be or not to be")).toBe("To be or to be not");
	});

	it("handles a single word", () => {
		expect(arrangeWords("Hello")).toBe("Hello");
	});
});
