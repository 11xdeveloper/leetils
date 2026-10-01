import { describe, expect, it } from "bun:test";
import { type TreeNode, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { constructBinaryTreeFromPreorderAndPostorderTraversal as constructFromPrePost } from ".";

const preorder = (node: TreeNode | null): number[] =>
	node ? [node.val, ...preorder(node.left), ...preorder(node.right)] : [];
const postorder = (node: TreeNode | null): number[] =>
	node ? [...postorder(node.left), ...postorder(node.right), node.val] : [];

describe("889. Construct Binary Tree from Preorder and Postorder Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(
				constructFromPrePost([1, 2, 4, 5, 3, 6, 7], [4, 5, 2, 6, 7, 3, 1]),
			),
		).toEqual([1, 2, 3, 4, 5, 6, 7]);
		expect(treeToArray(constructFromPrePost([1], [1]))).toEqual([1]);
	});

	it("rebuilds a tree with the same traversals on random trees", () => {
		const random = createRandom(889);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, 0, 0);
			let label = 1;
			const relabel = (node: TreeNode | null): void => {
				if (!node) return;
				node.val = label++;
				relabel(node.left);
				relabel(node.right);
			};
			relabel(root);
			const [pre, post] = [preorder(root), postorder(root)];
			const rebuilt = constructFromPrePost(pre, post);
			expect(preorder(rebuilt)).toEqual(pre);
			expect(postorder(rebuilt)).toEqual(post);
		}
	});
});
