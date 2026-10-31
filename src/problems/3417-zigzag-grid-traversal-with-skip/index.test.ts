import { describe, expect, it } from "bun:test";
import { zigzagGridTraversalWithSkip as zigzagTraversal } from ".";

describe("3417. Zigzag Grid Traversal With Skip", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			zigzagTraversal([
				[1, 2],
				[3, 4],
			]),
		).toEqual([1, 4]);
		expect(
			zigzagTraversal([
				[2, 1],
				[2, 1],
				[2, 1],
			]),
		).toEqual([2, 1, 2]);
		expect(
			zigzagTraversal([
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]),
		).toEqual([1, 3, 5, 7, 9]);
	});
});
