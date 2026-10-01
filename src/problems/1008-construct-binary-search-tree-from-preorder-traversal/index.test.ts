import { describe, expect, it } from "bun:test";
import { type TreeNode, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { constructBinarySearchTreeFromPreorderTraversal as bstFromPreorder } from ".";

const preorder = (node: TreeNode | null): number[] =>
	node ? [node.val, ...preorder(node.left), ...preorder(node.right)] : [];

describe("1008. Construct Binary Search Tree from Preorder Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(treeToArray(bstFromPreorder([8, 5, 1, 7, 10, 12]))).toEqual([
			8,
			5,
			10,
			1,
			7,
			null,
			12,
		]);
		expect(treeToArray(bstFromPreorder([1, 3]))).toEqual([1, null, 3]);
	});

	it("rebuilds random binary search trees from their preorder", () => {
		const random = createRandom(1008);
		for (let run = 0; run < 500; run++) {
			const root = bstFromValues([
				...new Set(random.array(random.int(1, 25), 1, 100)),
			]);
			expect(treeToArray(bstFromPreorder(preorder(root)))).toEqual(
				treeToArray(root),
			);
		}
	});
});
