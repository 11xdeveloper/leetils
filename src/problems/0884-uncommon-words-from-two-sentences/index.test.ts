import { describe, expect, it } from "bun:test";
import { uncommonWordsFromTwoSentences as uncommonFromSentences } from ".";

describe("884. Uncommon Words from Two Sentences", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			uncommonFromSentences("this apple is sweet", "this apple is sour"),
		).toEqual(["sweet", "sour"]);
		expect(uncommonFromSentences("apple apple", "banana")).toEqual(["banana"]);
	});
});
