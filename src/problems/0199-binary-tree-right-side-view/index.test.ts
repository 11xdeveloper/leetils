import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { binaryTreeLevelOrderTraversal } from "../0102-binary-tree-level-order-traversal";
import { binaryTreeRightSideView } from ".";

describe("199. Binary Tree Right Side View", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			binaryTreeRightSideView(treeFromArray([1, 2, 3, null, 5, null, 4])),
		).toEqual([1, 3, 4]);
		expect(
			binaryTreeRightSideView(treeFromArray([1, 2, 3, 4, null, null, null, 5])),
		).toEqual([1, 3, 4, 5]);
		expect(binaryTreeRightSideView(treeFromArray([1, null, 3]))).toEqual([
			1, 3,
		]);
		expect(binaryTreeRightSideView(null)).toEqual([]);
	});

	it("matches the last value of each level on random trees", () => {
		const random = createRandom(199);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 30, -9, 9);
			expect(binaryTreeRightSideView(root)).toEqual(
				binaryTreeLevelOrderTraversal(root).map((level) => level.at(-1) ?? 0),
			);
		}
	});
});
