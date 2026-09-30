import { describe, expect, it } from "bun:test";
import { wordSubsets } from ".";

describe("916. Word Subsets", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			wordSubsets(
				["amazon", "apple", "facebook", "google", "leetcode"],
				["e", "o"],
			),
		).toEqual(["facebook", "google", "leetcode"]);
		expect(
			wordSubsets(
				["amazon", "apple", "facebook", "google", "leetcode"],
				["l", "e"],
			),
		).toEqual(["apple", "google", "leetcode"]);
	});

	it("respects repeated letters", () => {
		expect(
			wordSubsets(
				["amazon", "apple", "facebook", "google", "leetcode"],
				["oo"],
			),
		).toEqual(["facebook", "google"]);
		expect(
			wordSubsets(
				["amazon", "apple", "facebook", "google", "leetcode"],
				["lo", "eo"],
			),
		).toEqual(["google", "leetcode"]);
	});
});
