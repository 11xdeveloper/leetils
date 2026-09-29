import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { binaryTreePreorderTraversal } from ".";

describe("144. Binary Tree Preorder Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(binaryTreePreorderTraversal(treeFromArray([1, null, 2, 3]))).toEqual(
			[1, 2, 3],
		);
		expect(
			binaryTreePreorderTraversal(
				treeFromArray([1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9]),
			),
		).toEqual([1, 2, 4, 5, 6, 7, 3, 8, 9]);
		expect(binaryTreePreorderTraversal(null)).toEqual([]);
	});

	it("matches a recursive traversal on random trees", () => {
		const random = createRandom(144);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 30, -9, 9);
			expect(binaryTreePreorderTraversal(root)).toEqual(
				nodesOf(root).map((node) => node.val),
			);
		}
	});
});
