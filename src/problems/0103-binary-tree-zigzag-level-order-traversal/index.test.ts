import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { binaryTreeLevelOrderTraversal } from "../0102-binary-tree-level-order-traversal";
import { binaryTreeZigzagLevelOrderTraversal } from ".";

describe("103. Binary Tree Zigzag Level Order Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			binaryTreeZigzagLevelOrderTraversal(
				treeFromArray([3, 9, 20, null, null, 15, 7]),
			),
		).toEqual([[3], [20, 9], [15, 7]]);
		expect(binaryTreeZigzagLevelOrderTraversal(treeFromArray([1]))).toEqual([
			[1],
		]);
		expect(binaryTreeZigzagLevelOrderTraversal(null)).toEqual([]);
	});

	it("reverses every other level", () => {
		expect(
			binaryTreeZigzagLevelOrderTraversal(
				treeFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9]),
			),
		).toEqual([[1], [3, 2], [4, 5, 6, 7], [9, 8]]);
	});

	it("matches reversing odd levels of the level order traversal on random trees", () => {
		const random = createRandom(103);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 30, -9, 9);
			expect(binaryTreeZigzagLevelOrderTraversal(root)).toEqual(
				binaryTreeLevelOrderTraversal(root).map((level, i) =>
					i % 2 === 0 ? level : level.toReversed(),
				),
			);
		}
	});
});
