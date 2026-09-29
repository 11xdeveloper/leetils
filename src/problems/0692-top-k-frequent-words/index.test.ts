import { describe, expect, it } from "bun:test";
import { topKFrequentWords as topKFrequent } from ".";

describe("692. Top K Frequent Words", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 2),
		).toEqual(["i", "love"]);
		expect(
			topKFrequent(
				["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"],
				4,
			),
		).toEqual(["the", "is", "sunny", "day"]);
	});

	it("breaks ties by lexicographic order, not first appearance", () => {
		expect(topKFrequent(["b", "a", "c", "b", "a"], 3)).toEqual(["a", "b", "c"]);
	});
});
