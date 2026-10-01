import { describe, expect, it } from "bun:test";
import { maximumNumberOfWordsYouCanType as canBeTypedWords } from ".";

describe("1935. Maximum Number of Words You Can Type", () => {
	it("solves the examples from the problem statement", () => {
		expect(canBeTypedWords("hello world", "ad")).toBe(1);
		expect(canBeTypedWords("leet code", "lt")).toBe(1);
		expect(canBeTypedWords("leet code", "e")).toBe(0);
	});
});
