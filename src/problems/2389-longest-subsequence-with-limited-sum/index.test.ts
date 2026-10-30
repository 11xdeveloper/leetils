import { describe, expect, it } from "bun:test";
import { longestSubsequenceWithLimitedSum as answerQueries } from ".";

describe("2389. Longest Subsequence With Limited Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(answerQueries([4, 5, 2, 1], [3, 10, 21])).toEqual([2, 3, 4]);
		expect(answerQueries([2, 3, 4, 5], [1])).toEqual([0]);
	});
});
