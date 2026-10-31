import { describe, expect, it } from "bun:test";
import { countValidWordOccurrences as countWordOccurrences } from ".";

describe("3926. Count Valid Word Occurrences", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countWordOccurrences(
				["hello wor", "ld hello"],
				["hello", "world", "wor"],
			),
		).toEqual([2, 1, 0]);
		expect(
			countWordOccurrences(["a-b a--b ", "a-", "b"], ["a-b", "a", "b"]),
		).toEqual([2, 1, 1]);
		expect(
			countWordOccurrences(
				["-cat dog- mouse"],
				["cat", "dog", "mouse", "cat-dog"],
			),
		).toEqual([1, 1, 1, 0]);
	});
});
