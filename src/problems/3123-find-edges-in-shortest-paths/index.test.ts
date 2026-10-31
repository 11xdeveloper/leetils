import { describe, expect, it } from "bun:test";
import { findEdgesInShortestPaths } from ".";

describe("3123. Find Edges in Shortest Paths", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findEdgesInShortestPaths(6, [
				[0, 1, 4],
				[0, 2, 1],
				[1, 3, 2],
				[1, 4, 3],
				[1, 5, 1],
				[2, 3, 1],
				[3, 5, 3],
				[4, 5, 2],
			]),
		).toEqual([true, true, true, false, true, true, true, false]);
		expect(
			findEdgesInShortestPaths(4, [
				[2, 0, 1],
				[0, 1, 1],
				[0, 3, 4],
				[3, 2, 2],
			]),
		).toEqual([true, false, false, true]);
	});

	it("marks nothing when the end is unreachable", () => {
		expect(findEdgesInShortestPaths(3, [[0, 1, 1]])).toEqual([false]);
	});
});
