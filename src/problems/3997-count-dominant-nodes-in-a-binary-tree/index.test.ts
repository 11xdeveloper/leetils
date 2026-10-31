import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { countDominantNodesInABinaryTree as countDominantNodes } from ".";

describe("3997. Count Dominant Nodes in a Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(countDominantNodes(treeFromArray([5, 3, 8, 2, 4, 7, 1]))).toBe(5);
		expect(countDominantNodes(treeFromArray([1, 2, 3, 1, 2]))).toBe(4);
	});
});
