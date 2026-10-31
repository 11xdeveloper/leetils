import { describe, expect, it } from "bun:test";
import { countUnreachablePairsOfNodesInAnUndirectedGraph as countPairs } from ".";

describe("2316. Count Unreachable Pairs of Nodes in an Undirected Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countPairs(3, [
				[0, 1],
				[0, 2],
				[1, 2],
			]),
		).toBe(0);
		expect(
			countPairs(7, [
				[0, 2],
				[0, 5],
				[2, 4],
				[1, 6],
				[5, 4],
			]),
		).toBe(14);
	});
});
