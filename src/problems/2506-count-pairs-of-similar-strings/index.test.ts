import { describe, expect, it } from "bun:test";
import { countPairsOfSimilarStrings as similarPairs } from ".";

describe("2506. Count Pairs Of Similar Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(similarPairs(["aba", "aabb", "abcd", "bac", "aabc"])).toBe(2);
		expect(similarPairs(["aabb", "ab", "ba"])).toBe(3);
		expect(similarPairs(["nba", "cba", "dba"])).toBe(0);
	});
});
