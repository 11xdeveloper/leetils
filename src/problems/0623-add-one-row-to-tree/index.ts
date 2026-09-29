import { TreeNode } from "../../structures/tree-node";

/**
 * 623. Add One Row to Tree
 *
 * Inserts a row of nodes holding `val` at `depth` (the root is depth 1).
 * Each node at `depth - 1` gets two new children, and its old left and
 * right subtrees become the new left child's left and the new right
 * child's right. For `depth` 1, the new node becomes the root with the old
 * tree as its left subtree. The tree is modified in place.
 *
 * Breadth-first search down to the nodes at `depth - 1`, then splices in
 * the new row.
 *
 * @see https://leetcode.com/problems/add-one-row-to-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(w) where w is the widest level
 *
 * @example
 * treeToArray(addOneRowToTree(treeFromArray([4, 2, 6, 3, 1, 5]), 1, 2)); // [4, 1, 1, 2, null, null, 6, 3, 1, 5]
 */
export const addOneRowToTree = (
	root: TreeNode | null,
	val: number,
	depth: number,
): TreeNode | null => {
	if (depth === 1) return new TreeNode(val, root);

	let level = root ? [root] : [];
	for (let current = 1; current < depth - 1; current++) {
		level = level.flatMap((node) =>
			[node.left, node.right].filter((child) => child !== null),
		);
	}
	for (const node of level) {
		node.left = new TreeNode(val, node.left);
		node.right = new TreeNode(val, null, node.right);
	}

	return root;
};
