import { TreeNode } from "../../structures/tree-node";

/**
 * 1028. Recover a Tree From Preorder Traversal
 *
 * Rebuilds a binary tree from a preorder listing where each node's value is
 * preceded by as many dashes as its depth, like `"1-2--3--4-5--6--7"`. A
 * node with one child has it on the left.
 *
 * Reads depth and value pairs, keeping a stack of the current path. A node
 * at depth `d` is a child of the path's node at depth `d - 1`, left if
 * that's free, else right.
 *
 * @see https://leetcode.com/problems/recover-a-tree-from-preorder-traversal/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * treeToArray(recoverATreeFromPreorderTraversal("1-2--3--4-5--6--7")); // [1, 2, 5, 3, 4, 6, 7]
 */
export const recoverATreeFromPreorderTraversal = (
	traversal: string,
): TreeNode | null => {
	const path: TreeNode[] = [];
	for (const [, dashes = "", value = "0"] of traversal.matchAll(/(-*)(\d+)/g)) {
		const node = new TreeNode(Number(value));
		path.length = dashes.length;
		const parent = path.at(-1);
		if (parent) {
			if (!parent.left) parent.left = node;
			else parent.right = node;
		}
		path.push(node);
	}
	return path[0] ?? null;
};
