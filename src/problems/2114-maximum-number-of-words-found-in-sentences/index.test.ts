import { describe, expect, it } from "bun:test";
import { maximumNumberOfWordsFoundInSentences as mostWordsFound } from ".";

describe("2114. Maximum Number of Words Found in Sentences", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			mostWordsFound([
				"alice and bob love leetcode",
				"i think so too",
				"this is great thanks very much",
			]),
		).toBe(6);
		expect(
			mostWordsFound(["please wait", "continue to fight", "continue to win"]),
		).toBe(3);
	});
});
