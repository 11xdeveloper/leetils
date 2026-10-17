import { describe, expect, it } from "bun:test";
import { numberOfValidWordsInASentence as countValidWords } from ".";

describe("2047. Number of Valid Words in a Sentence", () => {
	it("solves the examples from the problem statement", () => {
		expect(countValidWords("cat and  dog")).toBe(3);
		expect(countValidWords("!this  1-s b8d!")).toBe(0);
		expect(countValidWords("alice and  bob are playing stone-game10")).toBe(5);
	});

	it("checks hyphens and punctuation", () => {
		expect(countValidWords("a-b-c a- -a a-b. ! .a ab!c")).toBe(2);
	});
});
