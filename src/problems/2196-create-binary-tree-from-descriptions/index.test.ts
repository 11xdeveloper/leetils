import { describe, expect, it } from "bun:test";
import { treeToArray } from "../../structures/tree-node";
import { createBinaryTreeFromDescriptions as createBinaryTree } from ".";

describe("2196. Create Binary Tree From Descriptions", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(
				createBinaryTree([
					[20, 15, 1],
					[20, 17, 0],
					[50, 20, 1],
					[50, 80, 0],
					[80, 19, 1],
				]),
			),
		).toEqual([50, 20, 80, 15, 17, 19]);
		expect(
			treeToArray(
				createBinaryTree([
					[1, 2, 1],
					[2, 3, 0],
					[3, 4, 1],
				]),
			),
		).toEqual([1, 2, null, null, 3, 4]);
	});
});
