import { describe, expect, it } from "bun:test";
import { checkIfAWordOccursAsAPrefixOfAnyWordInASentence as isPrefixOfWord } from ".";

describe("1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence", () => {
	it("solves the examples from the problem statement", () => {
		expect(isPrefixOfWord("i love eating burger", "burg")).toBe(4);
		expect(isPrefixOfWord("this problem is an easy problem", "pro")).toBe(2);
		expect(isPrefixOfWord("i am tired", "you")).toBe(-1);
	});

	it("ignores matches in the middle of a word", () => {
		expect(isPrefixOfWord("hello world", "orl")).toBe(-1);
	});
});
