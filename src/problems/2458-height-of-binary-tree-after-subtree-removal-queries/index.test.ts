import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { heightOfBinaryTreeAfterSubtreeRemovalQueries as treeQueries } from ".";

describe("2458. Height of Binary Tree After Subtree Removal Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeQueries(
				treeFromArray([
					1,
					3,
					4,
					2,
					null,
					6,
					5,
					null,
					null,
					null,
					null,
					null,
					7,
				]),
				[4],
			),
		).toEqual([2]);
		expect(
			treeQueries(treeFromArray([5, 8, 9, 2, 1, 3, 7, 4, 6]), [3, 2, 4, 8]),
		).toEqual([3, 2, 3, 2]);
	});
});
