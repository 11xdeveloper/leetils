import { describe, expect, it } from "bun:test";
import { minimumNumberOfVerticesToReachAllNodes as findSmallestSetOfVertices } from ".";

describe("1557. Minimum Number of Vertices to Reach All Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findSmallestSetOfVertices(6, [
				[0, 1],
				[0, 2],
				[2, 5],
				[3, 4],
				[4, 2],
			]),
		).toEqual([0, 3]);
		expect(
			findSmallestSetOfVertices(5, [
				[0, 1],
				[2, 1],
				[3, 1],
				[1, 4],
				[2, 4],
			]),
		).toEqual([0, 2, 3]);
	});
});
