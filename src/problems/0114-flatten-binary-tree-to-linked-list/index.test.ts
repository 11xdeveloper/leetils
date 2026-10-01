import { describe, expect, it } from "bun:test";
import {
	type TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { flattenBinaryTreeToLinkedList } from ".";

describe("114. Flatten Binary Tree to Linked List", () => {
	it("solves the examples from the problem statement", () => {
		const root = treeFromArray([1, 2, 5, 3, 4, null, 6]);
		expect(flattenBinaryTreeToLinkedList(root)).toBeUndefined();
		expect(treeToArray(root)).toEqual([
			1,
			null,
			2,
			null,
			3,
			null,
			4,
			null,
			5,
			null,
			6,
		]);
	});

	it("handles a single node and an empty tree", () => {
		const single = treeFromArray([0]);
		flattenBinaryTreeToLinkedList(single);
		expect(treeToArray(single)).toEqual([0]);
		expect(() => flattenBinaryTreeToLinkedList(null)).not.toThrow();
	});

	it("links the same nodes in preorder on random trees", () => {
		const random = createRandom(114);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 30, 0, 9);
			const preorder = nodesOf(root);
			flattenBinaryTreeToLinkedList(root);
			const flattened: TreeNode[] = [];
			for (let node = root; node; node = node.right) {
				expect(node.left).toBeNull();
				flattened.push(node);
			}
			expect(flattened).toHaveLength(preorder.length);
			for (const [i, node] of flattened.entries()) {
				expect(node === preorder[i]).toBeTrue();
			}
		}
	});
});
