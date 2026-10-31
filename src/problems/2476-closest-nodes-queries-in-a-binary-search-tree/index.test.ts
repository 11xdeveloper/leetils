import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { closestNodesQueriesInABinarySearchTree as closestNodes } from ".";

describe("2476. Closest Nodes Queries in a Binary Search Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			closestNodes(
				treeFromArray([
					6,
					2,
					13,
					1,
					4,
					9,
					15,
					null,
					null,
					null,
					null,
					null,
					null,
					14,
				]),
				[2, 5, 16],
			),
		).toEqual([
			[2, 2],
			[4, 6],
			[15, -1],
		]);
		expect(closestNodes(treeFromArray([4, null, 9]), [3])).toEqual([[-1, 4]]);
	});
});
